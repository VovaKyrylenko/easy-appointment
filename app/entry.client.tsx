import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const client = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    uri: "http://localhost:3000/graphql",
  });

  hydrateRoot(
    document,
    <StrictMode>
      <ApolloProvider client={client}>
        <RemixBrowser />
      </ApolloProvider>
    </StrictMode>
  );
});
