import Room from "../models/room"
import slugify from "slugify"
export const getAll = async (req, res)=> {
    try {
        const room = await Room.find().exec()
        res.json(room)
    } catch (error) {
        
    }
}