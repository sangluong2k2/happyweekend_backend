import Category from '../models/categories'
import Room from "../models/room"
import slugify from 'slugify'

export const getall = async (req, res) => {
    const list = await Category.find().exec()
    res.json(list)
}

export const getone = async (req, res) => {
    const Cate = await Category.findOne({ slug: req.params.slug })
    res.json(Cate)
}

export const creat = async (req, res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const add = await Category(req.body).save()
        res.json(add)
    } catch (error) {

    }
}

export const update = async (req, res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const UpdateCate = await Category.findByIdAndUpdate({ _id: req.params.id },req.body,{new:true})
        res.json(UpdateCate)
    } catch (error) {

    }

}

export const remove = async (req, res) => {
    const Cate = await Category.findOneAndDelete({ _id: req.params.id })
    res.json(Cate)
}


export const read = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug}).exec()
        // console.log(category)
        const rooms = await Room.find({category: category}).populate('category').select().exec() 
        res.json({
            // category,
            rooms
        })
    } catch (error) {
        
    }
}