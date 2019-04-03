import { SLIME } from '../actions/types';

const DEFAULT_SLIME = {
    "slimeId": "",
    "bday": "",
    "nickname": "",
    "traits": [],
    "generationId": "",
    image:""
}

const slimeReducer = (state = DEFAULT_SLIME, action)=> {
    const {slime} = action;
    switch(action.type){
        case SLIME.FETCH:
            return {
                ...state,
                status: 'loading'
            };

        case SLIME.FETCH_SUCCESS:
            return {
                ...state,
                status: 'success',
                ...slime
            };

        case SLIME.FETCH_ERROR:
        return {
            ...state,
            status: 'error',
            message: action.message
        }

        default: return state;
    }

}

export default slimeReducer;