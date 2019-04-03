const pool = require('../databasePool');
const TRAITS = require('../data/traits.json');

/* 
    iterate over each trait, insert trait-value pair into db
*/

//console.log(JSON.stringify(trait, undefined, 2));


TRAITS.forEach((trait)=> {

    const traitType = trait.type;
    const traitValues = trait.values;

    traitValues.forEach((traitValue)=> {
        pool.query(
            `INSERT INTO trait("traitType", "traitValue")
            VALUES($1, $2)
            RETURNING id`,
            [traitType, traitValue],
            (err, res)=> {
                if(err){
                    return reject(console.error(err));
                }
                //grab the generated ID returned to us
                const traitId = res.rows[0].id;
                console.log('inserted trait: ', traitId);
            }
        );
    })
})