import { writable } from "svelte/store";
import type { ApolloClient } from "@apollo/client";

import { CurrentUser } from '../../requests.gql';

import { tokenAuth, tokenIsSet } from './tokenStorage';

export enum AuthStatus {
    None                = 0,
    LoggedIn            = 1,

    LoadingUserInfo     = 1 << 1,

    LoggingIn           = 1 << 2,
    LoadingAuthResults  = LoggingIn | 1 << 3,
    AuthError           = LoggingIn | 1 << 4
}

interface AuthStore {
    status: AuthStatus
    user?: UserInfo
}

const defaultValues: AuthStore = {
    status: AuthStatus.LoadingUserInfo
};
const { subscribe, set } = writable(defaultValues);

const authStore = {
    subscribe,
    setStatus(status: AuthStatus) {
        set({ status });
    },
    checkCurrentUser(client: ApolloClient<any>) {
        if (!tokenIsSet()) {
            set({
                status: AuthStatus.None
            })
            return;
        }
        client
            .query<{ currentUser: UserInfo }>({
                query: CurrentUser
            })
            .then(({ data }) =>
                set({
                    status: AuthStatus.LoggedIn,
                    user: data.currentUser
                })
            )
            .catch(err =>
                set({
                    status: AuthStatus.None
                })
            );
    },
    login(client: ApolloClient<any>, username: string, password: string) {
        set({
            status: AuthStatus.LoadingAuthResults
        });
        tokenAuth(client, username, password)
            .then(user =>
                set({
                    status: AuthStatus.LoggedIn,
                    user
                })
            )
            .catch(err =>
                set({
                    status: AuthStatus.AuthError
                })
            );
    }
};

export * from './tokenStorage';
export default authStore;
