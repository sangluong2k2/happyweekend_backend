import Basic from "../models/basic"

export const getall = async (req, res) =>{
    const list = await Basic.find().exec()
    res.json(list)
}
export const getone = async (req, res) =>{
    const list = await Basic.findOne({ _id: req.params.id }).exec()
    res.json(list)
}
export const creat = async (req, res) =>{
    const add = await Basic(req.body).save()
    res.json(add)
}
export const update = async (req, res) =>{
    const add = await Basic.findOneAndUpdate({ _id: req.params.id },req.body,{new:true}).exec()
    res.json(add)
}
export const remove = async (req, res) =>{
    const list = await Basic.findOneAndDelete({ _id: req.params.id }).exec()
    res.json(list)
}