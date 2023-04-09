const express = require('express');
    mongoose = require('mongoose');
    flash = require('connect-flash');
const app = express();
require('dotenv').config();

const DB_USERNAME = process.env.USERNAME;
DB_USERPASS = process.env.USERPASS;
const URI = `mongodb+srv://${DB_USERNAME}:${DB_USERPASS}@staysense.7ut2cez.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URI) 
.then(()=> {
    console.log('db working');
})
.catch(function(err) {
    console.log(err);
});

app.use(flash());
app.use((req,res, next)=>{
    res.locals.sucess = req.flash('sucess');
    res.locals.error = error.flash('error');
    next();

});


const hotelRoutes = require('./routes/hotel');
app.use(hotelRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log('server running on port'+ PORT);
});