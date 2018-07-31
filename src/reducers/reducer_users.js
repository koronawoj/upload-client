import * as ACTION_TYPES from '../constans';

const initialState = {
    username: '',
    files: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_USERNAME:
            return { ...state, username: action.payload };
        case ACTION_TYPES.SET_USER:
            return { ...state, username: action.payload.username,  files: action.payload.files};
        case ACTION_TYPES.SET_FILES:
            return { ...state, files: action.payload};
        case ACTION_TYPES.DELETE_FILE:
            return { ...state, files: state.files.filter(elem => elem !== action.payload)};
        default:
            return state;
    }
}