import axios from 'axios';
import { ACCOUNT } from './types';
import { SERVER } from '../config';
import { accountData } from '../../../server/app/account/session';


//TODO: abstract this stuff
export const signUp = ({ username, password })=> (dispatch)=> {
    return new Promise((resolve, reject)=> {

        dispatch({
            type: ACCOUNT.FETCH
        })

        axios({
            method: 'post',
            url:`${SERVER.ADDRESS}/account/signup`,
            headers: {'content-type': 'application/json' },
            data: JSON.stringify({username, password}),
            withCredentials: true
        }).then((res)=> {
            if(res.data.message.includes('Error')){
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
               
            }
            if(res.data.message.includes('session created')){
                dispatch({
                type: ACCOUNT.FETCH_SUCCESS,
                message: res.data.message
                });
                
            }
            else{
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
            }
            resolve();
            
        }).catch((err)=> {
            dispatch({
                type: ACCOUNT.FETCH_ERROR,
                message: err.message
            });
            reject();
        });
    });
}

export const login = ({username, password})=> (dispatch)=> {
    return new Promise((resolve, reject)=> {
        dispatch({
            type: ACCOUNT.FETCH
        });
    
        axios({
            method: 'post',
            url:`${SERVER.ADDRESS}/account/login`,
            headers: {'content-type': 'application/json' },
            data: JSON.stringify({username, password}),
            withCredentials: true
        }).then((res)=> {
            if(res.data.message.includes('Error')){
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
            }
            if(res.data.message.includes('session created')){
                dispatch({
                    type: ACCOUNT.FETCH_SUCCESS,
                    message: res.data.message
                });
            }
            else{
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
            }
            resolve();

        }).catch((err)=> {
            dispatch({
                type: ACCOUNT.FETCH_ERROR,
                message: err.message
            });
            reject();
        });  
    });

}



export const logout = () => (dispatch)=> {
    return new Promise((resolve, reject)=> {
        dispatch({
            type: ACCOUNT.FETCH
        });
    
        axios({
            method: 'post',
            url:`${SERVER.ADDRESS}/account/logout`,
            withCredentials: true
        }).then((res)=> {
            if(res.data.message.includes('Error')){
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
            }else{
                dispatch({
                    type: ACCOUNT.FETCH_LOGOUT,
                    message: res.data.message
                });
            }
            resolve();
        }).catch((err)=> {
            dispatch({
                type: ACCOUNT.FETCH_ERROR,
                message: err.message
            });
            reject();
        });
    });
};

//this will be called in index.js to decide whether or not a user should be thrown back to the login page
export const fetchAuthenticated = ()=> (dispatch)=> {

    return new Promise((resolve, reject)=> {
        dispatch({
            type: ACCOUNT.FETCH
        });
    
        axios({
            method: 'get',
            url:`${SERVER.ADDRESS}/account/authenticated`,
            withCredentials: true
        }).then((res)=> {
            const { authenticated } = res.data;
            if(authenticated == true){
                dispatch({
                    type:ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
                    message: res.data.message,
                    authenticated
                });
                resolve();
            }else{
                dispatch({
                    type: ACCOUNT.FETCH_ERROR,
                    message: res.data.message
                });
                resolve();
            }
        }).catch((err)=> {
            dispatch({
                type: ACCOUNT.FETCH_ERROR,
                message: err.message
            });
            reject();
        })
    });
};