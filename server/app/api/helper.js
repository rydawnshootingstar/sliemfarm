const moment = require('moment');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const AccountTable = require('../account/table');


/*                  API HELPER
    -called by POST /signup and /login with or without a sessionId
    -if no current session exists for a user, call database to set a session
    -if a session does exist, we only need to send the cookie
    -the JWT expires in 1 hour, can only be sent over https (remove comment for prod environment)
*/

const setSession = ({username, res, sessionId})=> {
    return new Promise((resolve, reject)=> {
        let session, sessionString;
        if(!sessionId){                                                             //no current session exists 
            session = new Session({username});
            sessionString = session.toString();
    
            AccountTable.updateSessionId({ 
                sessionId: session.id, 
                usernameHash: hash(username)  
            }).then(()=> {      
                setSessionCookie({sessionString, res});
                resolve({message: 'session created'});
            }).catch((err)=> {
                reject(err);
                console.error(err);
            });
        }else{
            sessionString = Session.sessionString({ username, id: sessionId});      //we can use this method because we have both parts already
            setSessionCookie({sessionString, res});
            resolve({message: 'session resumed'});
        }

    });

}

const setSessionCookie = ({ sessionString, res })=> {
    const expire = moment().add(1,'hour');
    res.cookie('sessionString', sessionString, {expire, httpOnly: true, /*secure: true*/});
}

module.exports = { setSession };