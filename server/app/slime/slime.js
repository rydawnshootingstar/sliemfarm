const moment = require('moment');
const traits = require('../../data/traits.json');


const DEFAULT_PROPERTIES = {
    slimeId: undefined,
    nickname: 'unnamed',
    generationId: undefined,
    get bday(){return moment()},
    get attributes(){
        const attributes = [];

        traits.forEach((trait)=> {
            const traitType = trait.type;
            const traitvalues = trait.values;

            const traitValue = traitvalues[Math.floor(Math.random()*traitvalues.length)]
            //push an object with these 
            attributes.push({traitType, traitValue});
        })

        return attributes;
    }
}

class Slime {

    constructor( {slimeId, bday, nickname, attributes, generationId} = {} ){
        this.slimeId = slimeId || DEFAULT_PROPERTIES.slimeId;
        this.bday = bday || DEFAULT_PROPERTIES.bday;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = attributes ||DEFAULT_PROPERTIES.attributes;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
    }

}

module.exports = Slime;