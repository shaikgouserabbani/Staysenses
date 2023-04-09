const express = require('express');
    passport = require('passport');
const router = express.Router();
const User = require('../models/DB_user');

 router.get('/register', (req, res) => {
    res.render('user/register');
 });

 router.get('/register', async (req, res) => {
    let user = new User({
        username: req.body.username
    });

    let registerUser = await User.register(user,req.body.password);
    req.login(registerUser, function(err){
        if (err) {
            req.flash('error','register failed,please try again');
            console.log(err);
            return res.redirect('/register');
    }
        req.flash('success','welcome user');
        res.redirect('/jobs');
    });
});
router.get('/login', (req, res) => {
	res.render('users/login');
});
router.post(
	'/login', passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		req.flash('success', 'welcome back user');
		let redirectUrl = req.session.returnTo || '/hotels';
		// delete req.session.returnTo;
		res.redirect(redirectUrl);
	}
);
router.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			req.flash('error', 'something went wrong while logging out');
			console.log(err);
			return res.redirect('/hotels');
		}
		req.flash('success', 'logout done');
		res.redirect('/hotels');
	});
});

module.exports = router;
