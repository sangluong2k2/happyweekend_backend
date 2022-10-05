import StatusRoom from '../models/statusroom'


export const getall = async (req,res) =>{
    const list = await StatusRoom.find().exec()
    res.json(list)
}