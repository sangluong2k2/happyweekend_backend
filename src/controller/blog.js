import Blog from "../models/blog"
import slugify from "slugify"

export const create = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try{
        const add = await Blog(req.body).save()
        res.json(add) 
    }catch(error){

    }
}

export const remove = async (req,res) => {
    try {
        const deleteBlog = await Blog.findOneAndDelete({_id:req.params.id}).exec()
        res.json(deleteBlog)
    } catch (error) {
        
    }
}

export const update = async (req,res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const updateBlog = await Blog.findOneAndUpdate({_id:req.params.id},req.body,{new:true}).exec()
        res.json(updateBlog)
    } catch (error) {
        
    }
}

export const getAll = async (req, res)=> {
    try {
        const getBlog = await Blog.find().exec()
        res.json(getBlog)
    } catch (error) {
        
    }
}

export const getOne = async (req, res)=> {
    try {
        const Blog = await Blog.find({ slug: req.params.slug }).exec()
        res.json(Blog[0])
    } catch (error) {
        
    }
}