import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { createAuthLink } from "./link-auth";
import cache from './cache';

export default function createClient(uri: string) {
    const httpLink = new HttpLink({ uri });
    const auth = createAuthLink();
    const link = from([
        auth.authLink,
        httpLink
    ]);

    const client = new ApolloClient({
        link,
        cache
    });

    auth.injectClient(client);

    return client;
}
