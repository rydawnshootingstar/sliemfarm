const { Router } = require('express');
const SlimeTable = require('../slime/table');

const router = new Router();



//next = middleware inclusion
router.get('/new', (req,res, next)=> {

    const slime = req.app.locals.engine.generation.newSlime();

    SlimeTable.storeSlime(slime).then(({ slimeId })=> {
        console.log('slimeid:', slimeId);
        //set object's Id to the one generated from DB call
        slime.slimeId = slimeId;

        res.json({ slime });
    }).catch((err)=> console.error(err));
});

module.exports = router;