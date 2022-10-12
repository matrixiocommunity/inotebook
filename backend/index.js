const connecttomongoose = require('./db');
const authentication = require('./router/auth');
const usernotes = require('./router/note');
const messages=require('./router/message');
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const port = 5000;
const app = express();
app.use(cors())
connecttomongoose();
app.use(express.json());
app.use(express.urlencoded());
app.get('/',(req,res)=>{
    res.send('good morning!');
})
app.use('/api/auth',authentication);
app.use('/api/note',usernotes);
app.use('/api/message',messages);

app.listen(port,(req,res)=>{
    console.log(`the server is started at http://localhost:${port}`);
})
