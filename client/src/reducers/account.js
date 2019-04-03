import { ACCOUNT } from '../actions/types';

/*
    -The inclusion of status messages is purely for practics purposes.
    -The loading status of a simple db query that takes milliseconds to perform doesn't need 
        to be reflected on the front-end
*/

const DEFAULT_ACCOUNT = { 
        loggedIn: false
}

const accountReducer = (state = DEFAULT_ACCOUNT, action) => {
    
    switch(action.type){

        case ACCOUNT.FETCH:
            return {
                ...state, 
                status: 'loading'
            }

        case ACCOUNT.FETCH_SUCCESS:
            return {
                ...state, 
                status: 'success',
                message: action.message,
                loggedIn: true
            }

        case ACCOUNT.FETCH_AUTHENTICATED_SUCCESS:
            return {
                ...state, 
                status: 'success',
                message: action.message,
                loggedIn: action.authenticated
            }

        case ACCOUNT.FETCH_LOGOUT:
            return {
                ...state,
                status: 'success',
                message: action.message,
                loggedIn: false
            }

        case ACCOUNT.FETCH_ERROR:
            return {
                ...state, 
                status: 'error',
                message: action.message
            }

        default: return state
    }
}

export default accountReducer;