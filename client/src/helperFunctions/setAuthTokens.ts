import setCookie from "./setCookie";

interface Tokens {
    accessToken: string,
    refreshToken: string,
}

export const setAuthTokens = (authData: Tokens) => {
    localStorage.setItem('accessToken', authData.accessToken);
    setCookie('refreshToken', authData.refreshToken, 60);
};
