import Order from '../models/order'
import Room from '../models/room'
import Basic from '../models/basic'
import Status from '../models/statusroom'
export const getall = async (req,res) =>{
    const list = await Order.find().exec()
    res.json(list)
}
export const orderroom = async (req,res) =>{
    const add = await new Order(req.body).save()
    res.json(add)
}
export const detailorder = async (req,res) =>{
    const order = await Order.findOne({ _id: req.params.id }).exec()
    const room = await Room.find({_id: order.room}).exec()
    const basic = await Basic.find({_id: room.basic}).exec()
    // const status = await Status.find({_id: order.status}).exec()
    res.json({
        order:{
            name:order.name,
            phone:order.phone,
            email:order.email,
            total:order.total
        },
        room,
        // status,
        basic
    }
    )
}

export const update = async (req,res) =>{
    const edit = await Order.findOneAndUpdate({ _id: req.params.id },req.body,{new:true})
    res.json(edit)
}

export const listUser = async (req,res) =>{
    const list = await Order.find({user: req.params.user}).exec()
    res.json(list)
}
