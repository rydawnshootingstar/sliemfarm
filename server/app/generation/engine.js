const Generation = require('./generation');
const moment = require('moment');
const GenerationTable = require('./table');

/*
    -Engine handles the creation of generation objects as well as executing
        read/write operations as defined by the GenerationTable
*/

class GenerationEngine{
    constructor(){
        this.generation = null;
        this.timer = null;
    }

    start(){
        this.buildNewGeneration();
    }

    stop(){
        //manually stops a timeout object set by setTimeout()
        clearTimeout(this.timer);
    }

    buildNewGeneration(){
        let generation = new Generation();
        
        //store generation object in db, set Id to what's returned by promise
        GenerationTable.storeGeneration(generation).then(({generationId})=> {
            this.generation = generation;
            this.generation.generationId = generationId;

            //after expiry period, call this function again
            this.timer = setTimeout(()=> this.buildNewGeneration(), this.generation.expiration - moment());
        }).catch((err)=> console.error(err));
    }

}

module.exports = GenerationEngine;