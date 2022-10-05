import Basic from "../models/basic"
import Room from "../models/room"

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

export const read = async (req, res) => {
    try {
        const basic = await Basic.findOne({_id: req.params.id}).exec()
        // console.log(category)
        const rooms = await Room.find({basic: basic}).populate('basic').select().exec() 
        res.json({
            basic,
            rooms
        })
    } catch (error) {
        
    }
}