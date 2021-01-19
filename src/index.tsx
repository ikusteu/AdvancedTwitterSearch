// import from node modules
import "regenerator-runtime/runtime"
import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import { ApolloProvider } from "@apollo/client"

// import apollo client
import client from "./app/apolloClient"

// render to DOM
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
)
