import Image from '../models/imagesroom'


export const create = async (req,res) => {
    try {
       const add = await  Image(req.body).save()
       res.json(add)
    } catch (error) {
        
    }
} 

export const remove = async (req,res) => {
    try {
        const deleteimage = await Image.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteimage)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
    try {
        const updateimage = await Image.findByIdAndUpdate({_id:req.params.id}, req.body, {news:true}).exec()
        res.json(updateimage)
    } catch (error) {
        
    }
}

export const getall = async (req,res) => {
    try {
        const list = await Image.find().exec()
        req.json(list)
    } catch (error) {
        
    }
}

export const getOne = async (req, res) => {
    try {
        const image = await Image.find({_id:req.params.id}).exec()
        req.json(image)
    } catch (error) {
        
    }
}