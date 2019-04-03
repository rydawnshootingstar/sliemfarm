import generation from './generation';
import slime from './slime';
import account from './account';
import { combineReducers } from 'redux';

export default combineReducers({
    generation, slime, account
});