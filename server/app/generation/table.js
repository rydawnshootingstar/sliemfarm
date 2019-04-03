/*
    Static functions for interacting with generation table
*/

const pool = require('../../databasePool');

class GenerationTable{
    
    static storeGeneration(generation){
        //return a promise so we can eventually return the generationId
        return new Promise((resolve, reject)=> {
            pool.query(
                //1-indexed syntax relating to the array that we pass. this sucks btw
                'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
                [generation.expiration],
                (err, res)=> {
                    if(err){
                        return reject(console.error(err));
                    }
                    //grab the generated ID returned to us
                    const generationId = res.rows[0].id;
                    resolve({generationId});
                }
            );
        })
    }

}

module.exports = GenerationTable;