import CategoryBlog from "../models/categories_blog"
import slugify from "slugify"

export const create = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try{
        const add = await CategoryBlog(req.body).save()
        res.json(add) 
    }catch(error){

    }
}

export const remove = async (req,res) => {
    try {
        const deleteCategoryBlog = await CategoryBlog.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteCategoryBlog)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const updateCategoryBlog = await CategoryBlog.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(updateCategoryBlog)
    } catch (error) {
        
    }
}

export const getAll = async (req, res)=> {
    try {
        const getCategoryBlog = await CategoryBlog.find().exec()
        res.json(getCategoryBlog)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const CategoryBlog = await CategoryBlog.find({ slug: req.params.slug }).exec()
        res.json(CategoryBlog[0])
    } catch (error) {
        
    }
}