// import from node modules
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { RestLink } from "apollo-link-rest"

// import auth token for now
import { authToken } from "../lib/constants"

// create new connection
const httpLink = new RestLink({
  uri: "http://localhost:4000/https://api.twitter.com/",
})

// apply token middleware
const authLink = setContext((_, { headers }) => {
  const Authorization = `Bearer ${authToken}`
  return {
    headers: {
      ...headers,
      Authorization,
    },
    fetchOptions: {
      mode: "no-cors",
    },
  }
})

// finalize link
const link = authLink.concat(httpLink)

// init cache
const cache = new InMemoryCache()

// init client
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
})

export default client
