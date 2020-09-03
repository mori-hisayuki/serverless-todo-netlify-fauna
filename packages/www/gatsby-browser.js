const React = require('react')
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require('@apollo/client')
const wrapRootElement = require('./wrap-root-element')

const client = new ApolloClient({
  uri: 'https://jamstack-todo-netlify-faunadb.netlify.app/.netlify/functions/graphql',
  cache: new InMemoryCache()
});

exports.wrapRootElement = ({element}) => (
  <ApolloProvider client={client}>
    {wrapRootElement({element})}
  </ApolloProvider>
)