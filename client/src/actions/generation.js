import axios from 'axios';
import { GENERATION } from './types';
import { SERVER } from '../config';

/*
    -inline creation of actions: outer arrow function with an inner that has dispatch object
    -since not every request will be a success, we only want to trigger a success
    action if we know the GET request worked
    -this pattern is highly scalable 
*/
export const getGeneration = ()=> (dispatch)=> {

    dispatch({
        type: GENERATION.FETCH
    });

    axios.get(`${SERVER.ADDRESS}/generation`).then((res)=> {

    if(res.status != 200){
        dispatch({
            type: GENERATION.FETCH_ERROR,
            message: res.satus
        })
    }

    const {generationId, expiration} = res.data.generation;
            dispatch(
                {type: GENERATION.FETCH_SUCCESS,
                generation: {generationId, expiration}
                }
            );

        
    }).catch((err)=> dispatch({type: GENERATION.FETCH_ERROR, message: err}));
}




//THE MORE BASIC WAY OF DOING THIS

// export const generationActionCreator = (payload)=> {
//     return{
//         type: GENERATION.FETCH,
//         generation: payload
//     }
// }   