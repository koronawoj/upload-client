import * as ACTION_TYPES from '../constans';

let initialState = {
    big: false,
    small: false,
};

export default function (state = initialState, action) {
    switch(action.type){
        case ACTION_TYPES.LOADING_BIG:
            return {...state, big: action.payload};
        case ACTION_TYPES.LOADING_SMALL:
            return {...state, small: action.payload};
        default:
            return state
    }
}