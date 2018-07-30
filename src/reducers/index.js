import {combineReducers} from 'redux';
import loader from './reducer_loader';
import auth from './reducer_auth';
import user from './reducer_users';

const rootReducer = combineReducers({
    loader,
    auth,
    user
});

export default rootReducer;

