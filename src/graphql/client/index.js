import { ApolloClient } from 'apollo-client';
import localForage from 'localforage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { RetryLink } from 'apollo-link-retry';
import { persistCache } from 'apollo-cache-persist';
import QueueLink from 'apollo-link-queue';

const API_HOST = `${process.env.APP_LINK}`;

export const queueLink = new QueueLink();

const getApolloClient = async () => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : '',
      }
    };
  });

  const httpLink = new HttpLink({
    uri: API_HOST,
  });

  const retry = new RetryLink({
    delay: {
      initial: 100,
      max: Infinity,
      jitter: true
    },
    attempts: { max: Infinity }
  });

  const cache = new InMemoryCache();

  await persistCache({
    cache,
    storage: localForage,
    maxSize: false
  });

  return new ApolloClient({
    link: ApolloLink.from([
      queueLink,
      retry,
      authLink,
      httpLink
    ]),
    cache
  });
};

export default getApolloClient;
