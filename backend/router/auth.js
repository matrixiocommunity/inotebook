const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
router.post(
    '/signup/:name/:email/:password',
    async(req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      try{
        const jwt_secret = 'hhhhhh';
      //     const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      let user = await User.findOne({email:req.params.email})
      if(user){
          return res.status(400).json({error:'a user with similar email id already exist'});
      }
      const secpass = bcrypt.hashSync(req.params.password,10);
      user = await User.create({
        name: req.params.name,
        email:req.params.email,
        password: secpass,
      })
      const data = {
        user:{
          id : user.id
        }
      }
      const authtoken = jwt.sign(data,jwt_secret);
      // res.json(user);
      res.json({authtoken});
    }catch(error){
        res.status(400).json({error:"there has a error in your code."});
    }
    },
  );
  //  create a post request to verify the user
router.post(
    '/login/:email/:password',
    // username must be an email
    // body('email','Enter a valid email id').isEmail(),
    // password must be at least 5 chars long
    // body('password','A minimum length of password is 5').isLength({min:5}),
    async(req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      try{    
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
      const jwt_secret = 'hhhhhh';
      const {email,password} = req.params;
      let user = await User.findOne({email})
      if(!user){
          return res.status(400).json({error : 'please enter the correct credentials'});
      }
      // const secpass = bcrypt.hashSync(req.body.password,10);
      const passwordcmp = bcrypt.compare(password,user.password);
      if(!passwordcmp){
        return res.status(400).json({error : 'please enter the correct credentials'});
      }
      const data = {
        user:{
          id : user.id
        }
      }
      const authtoken = jwt.sign(data,jwt_secret); 
      res.status(200).json({authtoken});
    }catch(error){
      res.status(400).json({error:"there has a error in your code."});
    }
    },
  );


  //post request to get the user data
  router.post('/getuserdata',fetchuser,async(req,res)=>{
       try{
         let userid = req.user.id;
         const user = await User.findById(userid);
         res.send(user);
       }catch(error){
         console.error(error.message);
         res.status(500).send("Internal server error");
       }
  })
module.exports = router;