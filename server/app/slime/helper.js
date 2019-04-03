const pool = require('../../databasePool');
const SlimeTable = require('./table');
const Slime = require('./slime');

/*
    Helper funciton that allows us to use multiple promises 

    First retrieves a slime object from the slime table, 
    then all traits associated with that ID,
    then returns that complete object

    All this instead of just using noSQL to look up a document by id
*/

const getSlimeWithTraits = ({slimeId})=> {
    //this will return an array with all of the promise resolution objects 
    return Promise.all([
        SlimeTable.getSlime({slimeId}),
        new Promise((resolve, reject)=> {
            pool.query(
                `SELECT "traitType", "traitValue" FROM trait INNER JOIN slimeTrait ON trait.id = slimeTrait."traitId"
                WHERE slimeTrait."slimeId" = $1`,
                [slimeId],
                (err, res)=> {
                    if(err){
                        reject(err);
                    }

                    resolve(res.rows);
                }
            );
        })
    ]).then(([slime, slimeTraits])=> {
        return new Slime({
            ...slime,
            slimeId,
            traits: slimeTraits
        })
    }).catch((err)=> console.error(err));
}

module.exports = getSlimeWithTraits;