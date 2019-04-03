const pool = require('../../databasePool');
const SlimeTraitTable = require('../slimeTrait/table');

/*
    Slime traits are a slightly more complicated thing to store in a 
    relational database. There are a few options, but I went with assigning
    each trait to an ID to be looked up for associations
*/

class SlimeTable{
    static storeSlime(slime){
        const { bday, nickname, generationId } = slime;

        return new Promise((resolve, reject)=> {
            pool.query(
                `INSERT INTO slime(bday, nickname, "generationId") 
                VALUES($1, $2, $3) RETURNING id`,
                [bday, nickname, generationId],
                (err, res)=> {
                    if(err){
                        return reject(console.error(err));
                    }
                    //grab the generated ID returned to us
                    const slimeId = res.rows[0].id;
                    
                    //destructure traits that were generated with slime object, 
                    Promise.all(slime.traits.map(({traitType, traitValue})=> {
                        //returns array of promise resolutions
                        return SlimeTraitTable.storeSlimeTrait({slimeId, traitType, traitValue});
                    }))
                    //resolve this promise only when all of the above promises have finished
                    .then(()=> {
                        resolve({slimeId});
                    })
                    .catch((err)=> {
                        reject(err);
                    });
                }
            );
        });
    }


    static getSlime({slimeId}){
        return new Promise((resolve, reject)=> {
            pool.query(
                'SELECT bday, nickname, "generationId" FROM slime WHERE slime.id = $1',
                [slimeId],
                (err, res)=> {
                    if(err){
                        return reject(err);
                    }

                    return res.rows.length === 0 ? reject(new Error('no slime exists with that ID')) : resolve(res.rows[0]);
                }
            )
        });
    }
}


module.exports = SlimeTable;