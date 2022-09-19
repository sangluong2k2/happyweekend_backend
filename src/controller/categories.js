import Category from '../models/categories'


export const getall = async (req,res) =>{
    const list = await Category.find().exec()
    res.json(list)
}