const mongoose = require('mongoose');
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
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', userSchema);
module.exports = User;
