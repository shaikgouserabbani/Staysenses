let mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
   },
   address: {
    type: String,
   required: true,
   },
   price: {
    type: Number,
    required: true,
    min: [100,'hotel room need to be atleast 100rs'],
    max: 10000,
   },
   isRoomAvailable: {
    type: Boolean,
    default: true,
   },
   image: 
   {
    type: String,
    required: true,
   },
   createdAt:{
    type: String,
    default:Date.now()
   },

   author:{
    type: mongoose.Schema.Types.ObjectId,
        ref :'user'

   },
   reviwes:[
   {
        type: mongoose.Schema.Types.ObjectId,
        ref :'reviwe'
   }
]

});

const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel;
