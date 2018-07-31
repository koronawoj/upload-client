import * as ACTION_TYPES from '../constans'
import { makeRequest } from '../actions/service'


export const loaderLinear = (loading) => {
    return {
        type: ACTION_TYPES.LOADING_BIG,
        payload: loading
    }
}


export const login = (data, callback) => async dispatch => {
    dispatch(loaderLinear(true));

    try {
        const success = await makeRequest('POST', 'signin', data, '');

        dispatch({type: ACTION_TYPES.AUTH_USER, payload: success.data.token});
        dispatch({type: ACTION_TYPES.SET_USER, payload: success.data});

        localStorage.setItem('token', success.data.token);
        localStorage.setItem('username', success.data.username);
        dispatch(loaderLinear(false));
        callback();
    } catch (error) {
        dispatch(loaderLinear(false));
        dispatch({type: ACTION_TYPES.AUTH_ERROR_LOGIN, payload: error.response.data.error});
    }
}

export const signup = (data, callback) => async dispatch => {
    dispatch(loaderLinear(true));

    try {
        const success = await makeRequest('POST', 'signup', data, '');

        dispatch({type: ACTION_TYPES.AUTH_USER, payload: success.data.token});
        dispatch(loaderLinear(false));
        localStorage.setItem('token', success.data.token);
        localStorage.setItem('username', success.data.username);
        callback();
    } catch (error) {
        dispatch(loaderLinear(false));
        dispatch({type: ACTION_TYPES.AUTH_ERROR_SIGNUP, payload: error.response.data.error});
    }
}

export const getFiles = (token) => async dispatch => {
    dispatch(loaderLinear(true));

    try {
        const success = await makeRequest('GET', 'getFiles', {}, token);
        dispatch({type: ACTION_TYPES.SET_FILES, payload: success.data.files});
        setTimeout(() => {
            dispatch(loaderLinear(false));
        }, 200)
    } catch (error) {
        dispatch(loaderLinear(false));
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }
}

export const deleteFile = (token, elem) => async dispatch => {
    dispatch(loaderLinear(true));

    try {
        await makeRequest('DELETE', `upload/${elem.slice(8)}`, {}, token);

        dispatch({type: ACTION_TYPES.DELETE_FILE, payload: elem});
        setTimeout(() => {
            dispatch(loaderLinear(false));
        }, 200)

    } catch (error) {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }
}

export const uploadFiles = (data, token, callback) => async dispatch => {
    dispatch(loaderLinear(true));

    try {
        const success = await makeRequest('POST', "upload", data, token);

        dispatch({type: ACTION_TYPES.SET_USER, payload: success.data});
        setTimeout(() => {
            callback();
            dispatch(loaderLinear(false));
        }, 500)

    } catch (error) {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }
}


export const logout = () => dispatch => {
    dispatch({type: ACTION_TYPES.LOGOUT});
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}

export const checkTokenExist = (callback) => dispatch => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    token = token ? token : '';
    dispatch({type: ACTION_TYPES.AUTH_USER, payload: token});
    dispatch({type: ACTION_TYPES.SET_USERNAME, payload: username});
    if (token) {
        callback()
    }
}