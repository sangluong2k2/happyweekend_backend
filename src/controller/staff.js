import Staff from "../models/staff"
import slugify from "slugify"

export const create = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const add = await Staff(req.body).save()
        res.json(add)
    } catch (error) {

    }
}
export const getAll = async (req, res)=> {
    try {
        const staff = await Staff.find().exec()
        res.json(staff)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const staff = await Staff.find({ slug: req.params.slug }).exec()
        res.json(staff)
    } catch (error) {
        
    }
}


export const remove = async (req,res)=>{
    try {
         const deletestaff = await Staff.findOneAndDelete({_id: req.params.id}).exec()
         res.json(deletestaff)
    } catch (error) {
        
    }
 }
 
 export const update = async (req,res)=>{
    req.body.slug = slugify(req.body.name)
     try {
         const newstaff = await Staff.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}).exec()
         res.json(newstaff)
     } catch (error) {
         
     }
 }