import React, { useContext, useState, useRef, useReducer } from 'react'
import { Router, Link } from "@reach/router"
import { Container, Flex, Button, NavLink, Label, Input, Checkbox } from 'theme-ui'
import { gql, useMutation, useQuery } from '@apollo/client'
import { IdentityContext } from '../../identity-context'

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`

const todosReducer = (state, action) => {
  switch(action.type) {
    case 'addTodo':
      return [{done: false, value: action.payload}, ...state]
    case 'toggleTodoDone':
      const newState = [...state]
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value
      }
      return newState
  }
}

export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext)
  const [todos, dispatch] = useReducer(todosReducer, [])
  const inputRef = useRef()
  const [addTodo] = useMutation(ADD_TODO);
  const {loading, error, data} = useQuery(GET_TODOS)

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashborad
        </NavLink>
        {user && (
          <NavLink href="#!" p={2} onClick={() => netlifyIdentity.logout()}>
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { text: inputRef.current.value } })
          inputRef.current.value = ''
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>Add Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }}></Input>
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex>
      <Flex sx={{ flexDirection: 'column' }}>
        {loading ? <div>loading....</div> : ''}
        {error ? <div>Error: {error.message}</div> : ''}
        {!loading && !error && (
          <ul sx={{ listStyle: 'none' }}>
            {data.todos.map((todo) => (
              <Flex
                key={todo.id}
                as='li'
                onClick={() => {
                  console.log('updateTOdoDone')
                }}
              >
                <Checkbox checked={todo.done} readOnly/>
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  );
}