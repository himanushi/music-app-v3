import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  RequestHandler,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { asyncMap } from "@apollo/client/utilities";
import { Capacitor } from "@capacitor/core";
import { graphqlUrl } from "~/lib/variable";
import { store } from "~/store/ionic";

const uri = graphqlUrl ? graphqlUrl : "http://localhost:3000/graphql";

const httpLink = new HttpLink({
  credentials: "include",
  uri,
});

const setResponseTokenLink = new ApolloLink((operation, forward) => asyncMap(forward(operation), async (response) => {
  if (response.extensions?.Authorization) {
    await store.set("Authorization", response.extensions.Authorization);
  }
  return response;
})
);

const setRequestTokenLink = setContext(async (_, { headers }) => {
  const token = await store.get("Authorization");
  return {
    headers: {
      ...headers,
      Authorization: token ? token : "",
    },
  };
});

const links: (ApolloLink | RequestHandler)[] =
  Capacitor.getPlatform() === "web" ? [httpLink] : [setResponseTokenLink, setRequestTokenLink, httpLink];

const link = ApolloLink.from(links);

const offsetLimitPagination = {
  keyArgs: [
    "conditions",
    [
      "name",
      "status",
      "favorite",
      "isMine",
      "artistIds",
      "albumIds",
      "trackIds",
      "usernames",
      [],
      "random",
    ],
    "sort",
    ["order", "type"],
  ],

  merge (existing = [], incoming = []) {
    return [...existing, ...incoming];
  },
};

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        albums: offsetLimitPagination,
        artists: offsetLimitPagination,
        playlists: offsetLimitPagination,
        tracks: offsetLimitPagination,
      },
    },
  },
});

export default new ApolloClient({
  cache,
  link,
});
