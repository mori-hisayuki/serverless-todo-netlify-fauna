import React, { useEffect, useState } from 'react'
import { Container, Heading, Button, Flex, NavLink} from 'theme-ui'
import { Link } from 'gatsby'
import netlifyIdentity from 'netlify-identity-widget'


export default props => {
  const [user, setUser] = useState()
  useEffect(() => {
    console.log('netlify-identity-widget init')
    netlifyIdentity.init({})
    netlifyIdentity.on("login", user => {
      netlifyIdentity.close()
      setUser(user)
    })
    netlifyIdentity.on("logout", () => setUser())
  })

  return (
    <Container>
      <Flex as='nav'>
        <NavLink as={Link} to='/' p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to='/app' p={2}>
          Dashborad
        </NavLink>
        {user && (
          <NavLink href='#!' p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3}}>
        <Heading as="h1">Get Stuff Done</Heading>
        <Button
          sx={{ marginTop:2 }}
          onClick={() =>{
            netlifyIdentity.open()
          }}
        >
          Log In
        </Button>
        <Button
          sx={{ marginTop:2 }}
          onClick={() =>{
            console.log(netlifyIdentity.currentUser())
          }}
        >
          Log User
        </Button>
      </Flex>
    </Container>
  )
}