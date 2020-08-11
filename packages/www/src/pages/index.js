import React from 'react'
import { Container, Heading, Button, Flex} from 'theme-ui'
import netlifyIdentity from 'netlify-identity-widget'
import { useEffect } from 'react'


export default props => {
  useEffect(() => {
    console.log('netlify-identity-widget init')
    netlifyIdentity.init({})
  })

  return (
    <Container>
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
      </Flex>
    </Container>
  )
}