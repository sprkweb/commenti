import type { ApolloClient } from "@apollo/client";
import { getContext, setContext } from "svelte";

const contextKey = Symbol("apollo-client");

export function setClient<TCache = any>(client: ApolloClient<TCache>) {
	setContext(contextKey, client);
}

export function getClient<TCache = any>(): ApolloClient<TCache> {
	const client: ApolloClient<TCache> = getContext(contextKey);
	if (!client)
		throw new Error("ApolloClient has not been set yet");
	return client;
}
