import { json } from "express";
import Comment from "../models/comments"
 

export const create = async (req,res) => {
    try{
        const add = await Comment(req.body).save();
        res.json(add) 
    }catch(error){

    }
}

export const remove = async (req,res) => {
    try {
        const deleteComment = await Comment.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteComment)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
   
    try {
        const updateComment = await Comment.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(updateComment)
    } catch (error) {
        
    }
}

export const getAll = async (req, res)=> {
    
    try {
        const getComment = await Comment.find().sort({createdAt: -1}).populate(["room","user"]).exec()
        res.json(getComment)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const Comment = await Comment.find({ _id: req.params.id }).exec()
        res.json(Comment)
    } catch (error) {

    }
}

export const listDetail = async (req,res) =>{
    const list = await Comment.find({room: req.params.room}).sort({createdAt: -1}).populate('user').select().exec()
    res.json( 
           list
        )
}

