import type { ApolloClient } from "@apollo/client";
import { TokenAuth, RefreshToken } from '../../requests.gql';

const accessTokenKey = 'commentiAccessToken';
const refreshTokenKey = 'commentiRefreshToken'

/**
 * This doesn't guarantee that tokens aren't expired
 */
function tokenIsSet(): boolean {
    return !!(
        localStorage.getItem(accessTokenKey) &&
        localStorage.getItem(refreshTokenKey));
}

function getToken(): string {
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

function clearTokens() {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
}

async function tokenAuth(client: ApolloClient<any>, username: string, password: string): Promise<UserInfo> {
    const { data } = await client
        .mutate<{ tokenAuth: { token: string; refreshToken: string; payload: any; refreshTokenExpiresIn: number; user: UserInfo }; }>({
            mutation: TokenAuth,
            variables: {
                username, password
            }
        });
    setToken(data.tokenAuth.token);
    setRefreshToken(data.tokenAuth.refreshToken);
    return data.tokenAuth.user;
};

async function refreshToken(client: ApolloClient<any>): Promise<boolean> {
    const oldRefreshToken = getRefreshToken();
    if (!oldRefreshToken) return false;
    const { data } = await client
        .mutate<{ refreshToken: { token: string; refreshToken: string; payload: any; refreshTokenExpiresIn: number; }; }>({
            mutation: RefreshToken,
            variables: {
                refreshToken: getRefreshToken()
            }
        });
    if (!data.refreshToken) return false;
    setToken(data.refreshToken.token);
    setRefreshToken(data.refreshToken.refreshToken);
    return true;
};

export { getToken, refreshToken, tokenAuth, tokenIsSet, clearTokens };
