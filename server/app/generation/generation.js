const moment = require('moment');
const Slime = require('../slime/slime');
const {refresh_rate, seconds} = require('../config');

/*
    -Generations are time periods during which we can create slimes
    -This class remains merely a model and doesn't include database read/write
        functionality
*/

//5 seconds
const refreshRate = refresh_rate * seconds;

class Generation {
    constructor(){
        this.createdAt = moment();
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;      //defined by db, set by engine.js
    }

    //computes an expiration date that is sometimes a little less than 5 seconds, sometimes a little more
    calculateExpiration(){
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
        const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod : refreshRate + expirationPeriod;
        return moment(this.createdAt).add(msUntilExpiration, 'milliseconds');
    }

    newSlime(details){
        const now = moment();
        if(moment(now).isAfter(moment(this.expiration))){
            return console.error('this generation expired on ', this.expiration);
        }
        return new Slime({...details, generationId: this.generationId});
    }

}

module.exports = Generation;