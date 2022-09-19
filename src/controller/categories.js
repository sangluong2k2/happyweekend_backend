import Category from '../models/categories'
import slugify from 'slugify'

export const getall = async (req,res) =>{
    const list = await Category.find().exec()
    res.json(list)
}

export const creat = async (req, res) =>{
    req.body.slug = slugify(req.body.name)
    try {
        const add = await Category(req.body).save()
        res.json(add)
    } catch (error) {
        
    } 
   
}