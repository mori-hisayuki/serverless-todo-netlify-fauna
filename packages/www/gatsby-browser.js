const React = require('react')
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require('@apollo/client')
const wrapRootElement = require('./wrap-root-element')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://jamstack-todo-netlify-faunadb.netlify.app/.netlify/functions/graphql',
  })
});

exports.wrapRootElement = ({element}) => (
  <ApolloProvider client={client}>
    {wrapRootElement({element})}
  </ApolloProvider>
)