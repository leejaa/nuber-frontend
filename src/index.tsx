import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { withClientState } from "apollo-link-state";
import { ApolloLink, split, Observable } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import App from "./Components/App";
import { BACKEND_URL} from "./env";
import { resolvers, defaults } from "./LocalState";
import "./global-styles";


  const httpLink = new HttpLink({
    uri: BACKEND_URL
  });

  const request = async (operation) => {
    const token = await localStorage.getItem('token');

    console.log(`token : ${token}`);

    operation.setContext({
      headers: {
        authorization: `bearer ${token}`
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

  const cache = new InMemoryCache();
  
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors){
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
            )
          );
        }
        if (networkError){
          console.log(`[Network error]: ${networkError}`);
        }
      }),
      withClientState({
        cache,
        resolvers: resolvers as any,
        defaults: defaults as any,
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
        httpLink
      )
    ]),
    cache: cache as any
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
