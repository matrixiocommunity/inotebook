const express = require('express');
const app=express();
const Message = require('../models/Message')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const bodyParser = require("body-parser")
const router = express.Router();
app.use(express.urlencoded());

router.post('/submitmessage',
  body('name','A minimum length of discription is 5').isLength({ min: 5 }),
  body('subject','A minimum length of discription is 5').isLength({ min: 5 }),
  body('mobile','A minimum length of discription is 5').isLength({ min: 10 }),
  body('email','Enter A Valid Email Id').isEmail(),
body('message','A minimum length of title is 5').isLength({min:5}),
async(req,res)=>{
try{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(500).json({error:error.array()})
    }
    const message =new Message({
        name:req.body.name,
        email : req.body.email,
        mobile:req.body.mobile,
        age:req.body.age,
        subject:req.body.subject,
        message:req.body.message
    })
    const savemessage=await message.save();
    return res.status(200).json({savemessage});
}catch(error){
   return res.status(400).json({"error":error});
}
})

module.exports=router;