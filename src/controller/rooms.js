import Room from "../models/room"
import Basic from "../models/basic"
import slugify from "slugify"

export const creat = async (req, res)=> {
    req.body.slug = slugify(req.body.name)
    try {
        const add = await Room(req.body).save()
        res.json(add)
    } catch (error) {

    }
}
export const getAll = async (req, res)=> {
    try {
        const room = await Room.find().exec()
        res.json(room)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const room = await Room.find({ slug: req.params.slug }).exec()
        res.json(room[0])
    } catch (error) {
        
    }
}


export const remove = async (req,res)=>{
    try {
         const deleteRomm = await Room.findOneAndDelete({_id: req.params.id}).exec()
         res.json(deleteRomm)
    } catch (error) {
        
    }
 }
 
 export const update = async (req,res)=>{
    req.body.slug = slugify(req.body.name)
     try {
         const newRoom = await Room.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}).exec()
         res.json(newRoom)
     } catch (error) {
         
     }
 }