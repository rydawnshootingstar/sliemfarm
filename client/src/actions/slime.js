import axios from 'axios';
import { SLIME } from './types';
import { SERVER } from '../config';

/*
    -Same pattern as generation
    -Slime image name gets formatted to meet the naming convention of our hosted images
*/

export const getSlime = ()=> (dispatch) => {

    dispatch({
        type: SLIME.FETCH
    });

    axios.get(`${SERVER.ADDRESS}/slime/new`).then((res)=> {
        if(res.status != 200){
            dispatch({
                type: SLIME.FETCH_ERROR,
                message: res.satus
            });
        }
            
            const {slime} = res.data;
            slime.image = slime.traits.map(trait=> trait.traitValue).join('_').concat('.png');

            dispatch({
                type: SLIME.FETCH_SUCCESS,
                slime: {...slime}
            });
        
    }).catch((err)=> dispatch({type: SLIME.FETCH_ERROR, message: err}));

}