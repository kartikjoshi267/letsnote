const { Router } = require('express');
const { default: mongoose } = require('mongoose');
const router = Router();
const persons = require('../models/counter');

router.post('/visit', async (req, res)=>{
    try{
        const person = await persons.create({
            sNo: mongoose.Schema.defaultMaxListeners,
            date: mongoose.Schema.defaultMaxListeners
        });
    
        res.send(json("Counter updated successfully"));
    }
    catch (error) {
        return res.status(500).send({ error: "Internal Server error occured" });
    }
});

module.exports = router;