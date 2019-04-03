const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper');
const { setSession } = require('./helper');
const Session = require('../account/session');


/*
    -JSON middleware allows parsing of incoming user object data
    -status 409 = standard for database information conflict 
    -setSession creates our cookie for us
    -API errors get sent to express with next()
*/

const router = new Router();

//post request contains body of JSON data
//add entry to DB, send confirmation message if success
//if erorr, call next to pass to error handling middlware
//in case of existing user, create an error object with a status code to send to app
//in case of promise error, call next with the promise's error
router.post('/signup', (req, res, next)=> {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({usernameHash}).then(({account})=> {
        if(!account){
            return AccountTable.storeAccount({usernameHash, passwordHash});
        }else{
            const err = new Error('Error: This username is already in use');
            res.statusCode = 409;
            res.json({message: err.message});
            throw err;
        }
    }).then(()=> {
        return setSession({username, res});     //make sure to return chained promises!
    }).then(({ message })=> {         
        res.json({message});                    //this message comes from the resolution of setSession
    }).catch((err)=> next(err));

});

//creates or resumes a new session
router.post('/login', (req, res, next)=> {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({usernameHash}).then(({account})=> {
        if(account && account.passwordHash === passwordHash){
            const {sessionId} = account;
            return setSession({username, res, sessionId});
        }else{
            const err = new Error('Error: Incorrect username/password');
            res.statusCode = 409;
            res.json({message: err.message});
            throw err;
        }
    }).then(({ message })=> {                   //reminder - message comes from setSession
        res.json({message});
    }).catch((err)=> next(err));
});

router.post('/logout', (req, res, next)=> {
    if(!req.cookies.sessionString){
        res.statusCode = 400;
        return res.json({message: 'Error: You are not logged in'});
    }
        const {username} = Session.parse(req.cookies.sessionString);
        const usernameHash = hash(username);
        AccountTable.updateSessionId({usernameHash, sessionId: null}).then(()=> {
            res.clearCookie('sessionString');    //clear the cookie called sessionString
            res.json({message: 'User logged out'});
        }).catch((err)=> next(err)); 
});

//checks to see if cookie's username and ID matches one in the DB
router.get('/authenticated', (req, res, next)=> {
    const { sessionString } = req.cookies;
    if(!sessionString || !Session.verify(sessionString)){
        //const error = new Error('Error: Invalid Session');
        res.statusCode = 400;
        res.json({message: 'Error: Invalid Session'})
    }else{
        const { username, id } = Session.parse(sessionString);
        const usernameHash = hash(username);
        AccountTable.getAccount({usernameHash}).then(({account})=> {
            const authenticated = account.sessionId === id;
            res.json({authenticated});
        }).catch((err)=> next(err));
    }
});

module.exports = router;