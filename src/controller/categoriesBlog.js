import CategoryBlog from '../models/categories_blog'
import Blog from "../models/blog"
import slugify from 'slugify'

export const getall = async (req, res) => {
    const list = await CategoryBlog.find().exec()
    res.json(list)
}

export const getone = async (req, res) => {
    const Cate = await CategoryBlog.findOne({ id: req.params.id })
    res.json(Cate)
}

export const creat = async (req, res) => {
    req.body.id = slugify(req.body.name)
    try {
        const add = await CategoryBlog(req.body).save()
        res.json(add)
    } catch (error) {

    }
}

export const update = async (req, res) => {
    req.body.id = slugify(req.body.name)
    try {
        const UpdateCate = await CategoryBlog.findByIdAndUpdate({ _id: req.params.id },req.body,{new:true})
        res.json(UpdateCate)
    } catch (error) {

    }

}

export const remove = async (req, res) => {
    const Cate = await CategoryBlog.findOneAndDelete({ _id: req.params.id })
    res.json(Cate)
}


export const read = async (req, res) => {
    try {
        const categoryBlog = await CategoryBlog.findOne({id: req.params.id}).exec()
        // console.log(categoryBlog)
        const rooms = await Blog.find({categoryBlog: categoryBlog}).populate('categoryBlog').select().exec() 
        res.json({
            // categoryBlog,
            rooms
        })
    } catch (error) {
        
    }
}