const pool = require('../../databasePool');

/*
    Static functions for interacting with trait table
*/

class TraitTable{
    static getTraitId({traitType, traitValue}){
        return new Promise((resolve, reject)=> {
            pool.query(
                'SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2',
                [traitType, traitValue],
                (err, res)=> {
                    if(err){
                        return reject(err);
                    }
                    const traitId = res.rows[0].id;
                    resolve({traitId});
                }
            )
        })
    }
}

module.exports = TraitTable;