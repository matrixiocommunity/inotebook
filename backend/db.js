const mongoose = require('mongoose');
const connecttomongoose = () =>{
    mongoose.connect('mongodb://localhost:27017/selfapi', {useNewUrlParser: true, useUnifiedTopology: true})
    const db= mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
    console.log("we are successfully connected.");
    });
}

module.exports = connecttomongoose;