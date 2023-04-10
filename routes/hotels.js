const express = require('express');
const router = express.Router();
const Hotel = require('../models/DB_hotel');

router.get('/', (req, res) => {
    res.send('landing');
});

router.get('/hotels', async (req, res) => {

    try {
        let hotels = await Hotel.find({});
        res.render('hotels/index',{hotels})
        
    } catch (error) {
        req.flash('error', 'error while featching hotels, plz try again');
        res.redirect('/')
    }
});

module.exports = router;