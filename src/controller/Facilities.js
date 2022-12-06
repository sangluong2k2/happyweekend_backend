import Faci from "../models/Facilities"
import slugify from "slugify"

export const create = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try{
        const add = await Faci(req.body).save()
        res.json(add) 
    }catch(error){

    }
}

export const remove = async (req,res) => {
    try {
        const deleteFaci = await Faci.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteFaci)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const updateFaci = await Faci.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(updateFaci)
    } catch (error) {
        
    }
}

export const getAll = async (req, res)=> {
    try {
        const getFaci = await Faci.find().exec()
        res.json(getFaci)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        // const Faci = await Faci.find({ slug: req.params.slug }).exec()
        // res.json(Faci[0])
        const abc = await Faci.find({ room: req.params.room }).populate('room').select('-room').exec()
        res.json(abc)
    } catch (error) {

    }
}