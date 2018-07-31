import * as ACTION_TYPES from '../constans';

const initialState = {
    authenticated: '',
    errorMessageLogin: '',
    errorMessageSignup: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.AUTH_USER:
            return { ...state, authenticated: action.payload, errorMessageLogin: '', errorMessageSignup: '' };
        case ACTION_TYPES.AUTH_ERROR_LOGIN:
            return { ...state, errorMessageLogin: action.payload };
        case ACTION_TYPES.AUTH_ERROR_SIGNUP:
            return { ...state, errorMessageSignup: action.payload };
        case ACTION_TYPES.LOGOUT:
            return { ...state, authenticated: '' };
        default:
            return state;
    }
}

