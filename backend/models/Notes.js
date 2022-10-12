const mongoose = require('mongoose');
const {Schema} = mongoose;
const notesschema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    discription:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notes = mongoose.model('notes',notesschema);
Notes.createIndexes();
module.exports=Notes;

