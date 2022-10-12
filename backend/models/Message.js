const mongoose = require('mongoose');
const {Schema} = mongoose;
const messageschema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
   date:{
        type:Date,
        default:Date.now
    }
})

const Message = mongoose.model('Message',messageschema);
Message.createIndexes();
module.exports = Message;
