const express = require('express'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	path = require('path');
const app = express();
require('dotenv').config();

const DB_USERNAME = process.env.USERNAME,
DB_USERPASS = process.env.USERPASS;
const URI = `mongodb+srv://${DB_USERNAME}:${DB_USERPASS}@staysense.7ut2cez.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URI) 
.then(()=> {
    console.log('db working');
})
.catch(function(err) {
    console.log(err);
});

const SESSION_PASS = process.env.SESSION_PASS;
app.use(
	session({
		secret: SESSION_PASS,
		resave: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			expires: Date.now() + 1000 * 60 * 60 * 24,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use((req,res, next)=>{
    res.locals.sucess = req.flash('sucess');  
    res.locals.error = error.flash('error');
    next();

});


const hotelRoutes = require('./routes/hotel');
const passport = require('passport');
app.use(hotelRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log('server running on port'+ PORT);
});