import axios from 'axios';
export const APP_HOST = 'http://127.0.0.1:8000';

function setCsrftoken(_csrfToken) {
    document.cookie = `csrftoken=${_csrfToken}`;
}


export const getCsrfToken = async () => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfToken) {
        return csrfToken.split('=')[1];
    }
    else{
        const response = axios({
            method: 'get',
            url: `${APP_HOST}/csrf/`,
            credentials: 'include',
        })
        let _csrfToken =   (await response).data.csrfToken;
        setCsrftoken(_csrfToken)
        return _csrfToken;
    }
}

export const fetchRequest = async (path, method='get', data={}) => {
    const response =  axios({
        method: method,
        url: `${APP_HOST}${path}`,
        data: data,
        credentials: 'include',
        // withCredentials: true,
        headers: {
            'X-CSRFToken':await getCsrfToken()
        },
    });

    return await response;
}

export default fetchRequest;