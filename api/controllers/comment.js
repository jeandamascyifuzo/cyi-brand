const mongoose = require('mongoose')
const Comments = require('../models/comment')

exports.addComment = async(req,res)=>{
    try {
        const data = (req.body)
        const comment = new Comments({...data, blog:req.params.id})

        await comment.save()
        res.status(200).send(comment)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

//get all comments

exports.getComments = async(req,res)=>{
    
        const comments = await Comments.findOne({blog:req.params.id})
        res.status(200).send(comments)
}