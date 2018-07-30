import * as ACTION_TYPES from '../constans'
import axios from 'axios'

export const loaderLinear = (loading) => {
    return {
        type: ACTION_TYPES.LOADING_LINEAR,
        payload: loading
    }
}


export const login = (data, callback) => async dispatch => {
    function onSuccess(success) {

        dispatch({type: ACTION_TYPES.AUTH_USER, payload: success.data.token});
        dispatch({type: ACTION_TYPES.SET_USER, payload: success.data});

        localStorage.setItem('token', success.data.token);
        localStorage.setItem('username', success.data.username);

        callback();
    }

    function onError() {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }

    try {
        const success = await axios.post(
            'http://localhost:3090/signin',
            data
        );
        return onSuccess(success);
    } catch (error) {
        return onError();
    }
}

export const signup = (data, callback) => async dispatch => {
    function onSuccess(success) {
        dispatch({type: ACTION_TYPES.AUTH_USER, payload: success.data.token});
        dispatch({type: ACTION_TYPES.SET_USER, payload: success.data});
        localStorage.setItem('token', success.data.token);
        localStorage.setItem('username', success.data.username);
        callback();
    }

    function onError() {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }

    try {
        const success = await axios.post(
            'http://localhost:3090/signup',
            data
        );
        return onSuccess(success);
    } catch (error) {
        return onError();
    }
}

export const getFiles = (token) => async dispatch => {
    function onSuccess(success) {
        dispatch({type: ACTION_TYPES.SET_FILES, payload: success.data.files});
    }

    function onError() {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }

    try {
        const success = await axios({
            method: 'GET',
            url: 'http://localhost:3090/getFiles',
            headers: {
                'authorization': token
            }});
        return onSuccess(success);
    } catch (error) {
        return onError();
    }
}

export const uploadFiles = (data, token, callback) => async dispatch => {
    function onSuccess(success) {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});


        localStorage.setItem('token', token);
        localStorage.setItem('username', success.data.username);

        callback();
    }

    function onError() {
        dispatch({type: ACTION_TYPES.AUTH_ERROR, payload: 'Invalid login credentials'});
    }

    try {
        const success = await axios({
            method: 'POST',
            url: 'http://localhost:3090/upload',
            data: data,
            headers: {
            'authorization': token
        }});

        return onSuccess(success);
    } catch (error) {
        return onError();
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
    if(token) {
        callback()
    }
}