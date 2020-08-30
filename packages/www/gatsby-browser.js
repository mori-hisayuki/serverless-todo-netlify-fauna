const React = require('react')
const {ApolloProvider, ApolloClient, InMemoryCache, HttpLink} = require('@apollo/client')
const wrapRootElement = require('./wrap-root-element')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    url: 'https://jamstack-todo-netlify-faunadb.netlify.app/.netlify/functions/graphql'
  })
})

exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    {wrapRootElement({ element })}
  </ApolloProvider>
)