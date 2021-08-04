import type { ApolloClient } from "@apollo/client";
import { TokenAuthDocument, RefreshTokenDocument, RevokeTokenDocument, CreateUserDocument } from '../../requests';

const accessTokenKey = 'commentiAccessToken';
const refreshTokenKey = 'commentiRefreshToken'

/**
 * This doesn't guarantee that tokens aren't expired
 */
export function tokenIsSet(): boolean {
    return !!(
        localStorage.getItem(accessTokenKey) &&
        localStorage.getItem(refreshTokenKey));
}

export function getToken(): string {
    return localStorage.getItem(accessTokenKey);
};

function setToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
}

function getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
}

function setRefreshToken(token: string) {
    localStorage.setItem(refreshTokenKey, token);
}

export function clearTokens() {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
}

export async function tokenAuth(client: ApolloClient<any>, username: string, password: string): Promise<UserInfo> {
    const { data } = await client.mutate({
            mutation: TokenAuthDocument,
            variables: {
                username, password
            }
        });
    setToken(data.tokenAuth.token);
    setRefreshToken(data.tokenAuth.refreshToken);
    return data.tokenAuth.user;
};

export async function refreshToken(client: ApolloClient<any>): Promise<boolean> {
    const oldRefreshToken = getRefreshToken();
    if (!oldRefreshToken) return false;
    const { data } = await client.mutate({
            mutation: RefreshTokenDocument,
            variables: {
                refreshToken: oldRefreshToken
            }
        });
    if (!data.refreshToken) return false;
    setToken(data.refreshToken.token);
    setRefreshToken(data.refreshToken.refreshToken);
    return true;
};

async function revokeToken(client: ApolloClient<any>): Promise<boolean> {
    const oldRefreshToken = getRefreshToken();
    await client.mutate({
            mutation: RevokeTokenDocument,
            variables: {
                refreshToken: oldRefreshToken
            }
        });
    return true;
};

export async function tokenLogout(client: ApolloClient<any>) {
    await revokeToken(client);
    clearTokens();
}

export async function createUser(client: ApolloClient<any>, userDetails): Promise<UserInfo> {
    const { data } = await client.mutate({
            mutation: CreateUserDocument,
            variables: {
                ...userDetails
            }
        });
    setToken(data.createUser.token);
    setRefreshToken(data.createUser.refreshToken);
    return data.createUser.user;
}
