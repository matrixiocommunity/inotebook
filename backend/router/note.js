const express = require('express');
const app=express();
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const bodyParser = require("body-parser")
const router = express.Router();
app.use(express.urlencoded());
router.post('/addnotes/:title/:discription/:tag',fetchuser,
    //   body('discription','A minimum length of discription is 5').isLength({ min: 5 }),
    // body('title','A minimum length of title is 5').isLength({min:5}),
    async(req,res)=>{
        // const error = validationResult(req);
        // if(!error.isEmpty()){
        //     return res.status(500).json({error:error.array()})
        // }
        const note =new Notes({
            user:req.user.id,
            title : req.params.title,
            discription:req.params.discription,
            tag:req.params.tag
        })
        const savenote=await note.save();
        return res.status(200).json({savenote});
})

router.post('/getusernotes',fetchuser,async(req,res)=>{
    try{
    const notes = await Notes.find({user : req.user.id});
    res.json(notes);
    }catch(error){
        res.json(error);
    }
})

router.put('/updatenote/:id/:title/:discription/:tag',fetchuser,
    async(req,res)=>{
        const {id,title,discription,tag} =req.params;
        const newnote = {}
        if(title){newnote.title = title}
        if(discription){newnote.discription= discription}
        if(tag){newnote.tag = tag}
        let note = await Notes.findById(id);
        if(!note){
            return res.status(500).send({error:"there has no such note present."});
        }
        if(note.user.toString()!==req.user.id){
            return res.status(500).send(error="Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        // console.log(newnote);
        return res.status(200).json(note);
})

// create a api endpoint to delete the note
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(500).send({error:"there has no such note present."});
    }
    if(note.user.toString()!==req.user.id){
        return res.status(500).send(error="Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send(note);
})

module.exports = router;