import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    Observable,
  } from "@apollo/client";
  import { HttpLink } from "@apollo/client";
  export { default as operations } from "./operations";
  import {ApolloNextAppProvider} from "@apollo/experimental-nextjs-app-support/ssr";
  
  
  const updateOperationHeader = (operation, publishableKey) =>
    operation.setContext(({ headers = {} }) => ({
      headers: {
        authorization: publishableKey,
        ...headers,
      },
    }));
  
  const TokenInterceptor = ({ pkey }) =>
    new ApolloLink(
      (operation, forward) =>
        new Observable((observer) => {
          updateOperationHeader(operation, pkey);
          forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
    );
  
  const apiLink = new HttpLink({
    uri: "https://api.test.deeplake.finance/graphql", //process.env.REACT_APP_API_REST_URL,
  });
  
  const client = ({ pkey }) =>
    new ApolloClient({
      link: ApolloLink.from([TokenInterceptor({ pkey }), apiLink]),
      cache: new InMemoryCache(),
    });
  
  export default client;

  export function ApolloWrapper({ children }) {
    return (
      <ApolloNextAppProvider makeClient={client}>
        {children}
      </ApolloNextAppProvider>
    );
  }
  