import StatusRoom from '../models/statusroom'

export const getall = async (req,res) =>{
    const list = StatusRoom.find().exec()
    res.json(list)
}