import getCookie from '../../helperFunctions/getCookie';
import setCookie from '../../helperFunctions/setCookie';

export type ApiRequestParams = {
    url: string,
    body: string
}

export const apiRequest = async ({ url, body }: ApiRequestParams): Promise<any> => {
    let headers;

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    } else {
        headers = {
            'Content-Type': 'application/json',
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {...headers},
        body: body
    });

    switch (response.status) {
        case 200:
            return await response.json();
        case 401:
            const refreshToken = getCookie('refreshToken');

            const query = `
                mutation refreshToken ($refreshToken: String!) {
                    auth {
                        refresh (refreshToken: $refreshToken) {
                            accessToken
                            refreshToken
                        }
                    }
                }`;

            const variables = {
                refreshToken: refreshToken
            }

            const refreshResponse = await fetch(url, {
                method: 'POST',
                headers: {...headers},
                body: JSON.stringify({ query, variables })
            });

            if (refreshResponse.status === 200) {
                const refreshJson = await refreshResponse.json();
                const tokens = refreshJson.data.auth.refresh;

                localStorage.setItem('accessToken', tokens.accessToken);
                setCookie('refreshToken', tokens.refreshToken, 60);

                return await apiRequest({ url, body });
            }

            return Promise.reject('You are not authorized');
        default:
            const err = await response.json();
            return Promise.reject(err.errors[0].message);
    }
}
