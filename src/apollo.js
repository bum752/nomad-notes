import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import { defaults, resolvers, typeDefs } from './clientState';

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    defaults,
    typeDefs,
    resolvers
});

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink])
});

export default client;