import { GENERATION } from '../actions/types';

/*
    -The inclusion of status messages is purely for practics purposes.
    -The loading status of a simple db query that takes milliseconds to perform doesn't need 
        to be reflected on the front-end
*/

const DEFAULT_GENERATION = { 
        generationId: '', 
        expiration: '' 
}

const generationReducer = (state = DEFAULT_GENERATION, action) => {
    const {generation} = action;
    switch(action.type){
        case GENERATION.FETCH:
            return {
                ...state, 
                status: 'loading'
            };

        case GENERATION.FETCH_SUCCESS:
            return {
                ...state, 
                status: 'success', 
                ...generation
            };

        case GENERATION.FETCH_ERROR:
            return {
                ...state, 
                status: 'error', 
                message: action.message
            };

        default: return state
        
    }
}

export default generationReducer;