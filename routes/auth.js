const express = require('express');
const router = express.Router();
 const User = require('..models/user');

 router.get('/register', (req, res) => {
    res.render('user/login');
 });

 router.get('/register', async (req, res) => {
    let user = new User({
        username: req.body.username
    });

    let registerUser = await User.register(user,req.body.password);
    req.logIn(registerUser, function(err){
        if (err) {
            console.log('err while registering user');
    }
    res.redirect('/jobs');
});
});

module.exports = router;
