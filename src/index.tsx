import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split, Observable } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import App from "./Components/App";
import { BACKEND_URL, SOCKET_URL } from "./env";



  const httpLink = new HttpLink({
    uri: BACKEND_URL
  });

  const wsLink = new WebSocketLink({
    uri: SOCKET_URL,
    options: {
      reconnect: true
    }
  });

  const request = async (operation) => {
    const token = await localStorage.getItem('jwt');
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  };
  
  const requestLink = new ApolloLink((operation, forward : any) => 
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
  
      return () => {
        if (handle){
          handle.unsubscribe();
        }
      };
    })
  );
  
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors){
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError){
          console.log(`[Network error]: ${networkError}`);
        }
      }),
      requestLink,
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        httpLink,
        wsLink
      )
    ]),
    cache: new InMemoryCache()
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
