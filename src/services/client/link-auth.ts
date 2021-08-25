import { ApolloLink, fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import type { ApolloClient, Operation } from "@apollo/client";

import * as authService from "../auth";

function setTokenHeader(operation: Operation): void {
	const token = authService.getToken();
	if (token)
		operation.setContext(({ headers }) => ({
			headers: {
                ...headers,
				'Authorization': `Bearer ${token}`
			}
		}));
}

function removeTokenHeader(operation: Operation): void {
    operation.setContext(({ headers }) => {
        delete headers['Authorization'];
        return headers;
    });
}

export function createAuthLink() {
    let client: ApolloClient<any>;
    function injectClient(newClient: ApolloClient<any>) {
        client = newClient;
    }

	const tokenHeaderLink = new ApolloLink((operation, forward) => {
    	setTokenHeader(operation);
		return forward(operation);
	});

	let refreshTokenPromise: Promise<boolean>;
	let notRefreshingNow = true;
    function refreshToken(): Promise<boolean>{
		if (notRefreshingNow) {
			refreshTokenPromise = authService.refreshToken(client);
			notRefreshingNow = false;
		}
		return refreshTokenPromise;
	}
	function finishRefresh() {
		notRefreshingNow = true;
	}

	const refreshTokenLink = onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
			for (const { message } of graphQLErrors)
				if (message === "Signature has expired") {
					return fromPromise(
							refreshToken().catch(() => {
								// Refresh failed
                                authService.clearTokens();
                                removeTokenHeader(operation);
								finishRefresh();
								return forward(operation);
							}),
						).flatMap(() => {
                            // Refresh successful
							finishRefresh();
							return forward(operation);
						});
				}
        }
    });

    const authLink: ApolloLink = refreshTokenLink.concat(tokenHeaderLink);

    return { injectClient, authLink };
}
