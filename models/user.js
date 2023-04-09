let mongoose = require('mongoose');
   passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
   username: {
    type: 'string',
    required:[ true, 'you need to pass a username' ],
    unique: true,
    trim: true,
   },
   image:{
    Type: String,
    
   }
});
const User = mongoose.model('user', hotelSchema);
module.exports = User;
