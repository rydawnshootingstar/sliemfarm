const uuid = require('uuid/v4');
const { hash } = require('./helper');

/*
    -uuid will be stored in DB as sessionId
    -toString generates a sessionString for an instance of the Session class
    -parse splits a sessionString formatted token into {username, id, hash}
    -accountData format = name|id
    -sessionString format = name|id|hash (this is the final form)
    -verify calculates hash, compares to sessionString 
*/

//no longer hard-code this value
const SEPARATOR = '|';

class Session{
    constructor({ username }){
        this.username = username;
        this.id = uuid();
    }

    toString(){
        const { username, id } = this;
        return Session.sessionString({username, id});
    }

    static parse(sessionString){
        const sessionData = sessionString.split(SEPARATOR);
        return{
            username: sessionData[0],
            id: sessionData[1],
            sessionHash: sessionData[2]
        }
    }

    static verify(sessionString){
        const { username, id, sessionHash } = Session.parse(sessionString);

        const accountData = Session.accountData({ username, id });

        return hash(accountData) === sessionHash;
    }

    static accountData({ username, id }){
        return `${username}${SEPARATOR}${id}`;
    }

    static sessionString({ username, id }){
        const accountData = Session.accountData({username,id});
        return `${accountData}${SEPARATOR}${hash(accountData)}`
    }
}

module.exports = Session;