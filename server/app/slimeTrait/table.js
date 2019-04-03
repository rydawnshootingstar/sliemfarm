const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

/*
    Relation between slimes and traits
*/


class SlimeTraitTable{
    //takes in data from a slime that's already been added to the slime table, and one trait-value pair at a time
    static storeSlimeTrait({slimeId, traitType, traitValue}){
        return new Promise((resolve, reject)=> {

            //look up the type and value passed in, return an object with the looked up trait's Id value
            //then store that id in the slimeTrait table along with the passed in slime Id
            TraitTable.getTraitId({traitType, traitValue})
            .then(({traitId})=> {
              pool.query(
                  'INSERT INTO slimeTrait("traitId", "slimeId") VALUES($1, $2)',
                  [traitId, slimeId],
                  (err, res)=> {
                    if(err){
                        return reject(err);
                    }
                    resolve();
                  }
              )  
            });
        });
    }
}

module.exports = SlimeTraitTable;