import axios from 'axios';


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
            url: `/csrf/`,
            credentials: 'include',
        })
        let _csrfToken =   (await response).data.csrfToken;
        setCsrftoken(_csrfToken)
        return _csrfToken;
    }
}

let currentUser = null;

export function setCurrentUser(user) {
    currentUser = user;
}

export const getCurrentUser = async () => {
    if (currentUser) {
        return currentUser;
    }
    else {
        const response = axios({
            method: 'get',
            url: `/rivals/user`,
            credentials: 'include',
        })
        currentUser = (await response).data;
        if (response.status === 401){
            currentUser = null;
            return null
        }
        setCurrentUser(currentUser);
        return currentUser;
    }
}


export const fetchRequest = async (path, method='get', data={}) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;
    axios.defaults.credentials = 'include';
    const response =  axios({
        method: method,
        url: `${path}`,
        data: data,
        headers: {
            'X-CSRFToken':await getCsrfToken()
        },
    });

    return await response;
}

export default fetchRequest;