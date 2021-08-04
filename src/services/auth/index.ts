import { writable } from "svelte/store";
import type { ApolloClient } from "@apollo/client";

import { CurrentUserDocument } from '../../requests';

import { tokenAuth, tokenLogout, tokenIsSet, createUser } from './tokenStorage';

export enum AuthStatus {
    None                = 0,
    LoggedIn            = 1,
    LoadingUserInfo     = 1 << 1,
    LoggingIn           = 1 << 2,
    Registration        = 1 << 3,

    LoadingResults      = 1 << 4,
    RequestFailed       = 1 << 5,

    LoadingAuthResults  = LoggingIn | LoadingResults,
    AuthError           = LoggingIn | RequestFailed,

    LoadingRegistrationResults  = Registration | LoadingResults,
    RegistrationError           = Registration | RequestFailed
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
            .query({
                query: CurrentUserDocument
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
    },
    logout(client: ApolloClient<any>) {
        tokenLogout(client)
            .then(() => this.checkCurrentUser(client));
    },
    signup(client: ApolloClient<any>, username: string, email: string, password: string) {
        set({
            status: AuthStatus.LoadingRegistrationResults
        });
        createUser(client, { username, email, password })
            .then(user =>
                set({
                    status: AuthStatus.LoggedIn,
                    user
                })
            )
            .catch(err =>
                set({
                    status: AuthStatus.RegistrationError
                })
            );
    }
};

export * from './tokenStorage';
export default authStore;
