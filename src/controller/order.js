import Order from '../models/order'

export const getall = (req,res) =>{
    const list = Order.find().exec()
    res.json(list)
}