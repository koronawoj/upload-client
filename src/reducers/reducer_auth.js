import * as ACTION_TYPES from '../constans';

const initialState = {
    authenticated: '',
    errorMessage: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.AUTH_USER:
            return { ...state, authenticated: action.payload };
        case ACTION_TYPES.AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case ACTION_TYPES.LOGOUT:
            return { ...state, authenticated: '' };
        default:
            return state;
    }
}

