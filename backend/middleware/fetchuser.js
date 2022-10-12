const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_secret = 'hhhhhh';

const app = express();

const fetchuser = (req,res,next) => {
       let token = req.header("authtoken");
       console.log(token);
       if(!token){
           return res.status(401).json({error:"please authenticate with valide id"})
       }
       try{
           const data = jwt.verify(token,jwt_secret);
           req.user = data.user;
           next();
       }catch(error){
              return res.status(401).json({error:"there has a some error in your code."})
       }
}

module.exports = fetchuser;