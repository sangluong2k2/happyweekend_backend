import StatusRoom from '../models/statusroom'
import Room from '../models/room'

export const getall = async (req,res) =>{
    const list = await StatusRoom.find().exec()
    res.json(list)
}
export const creat = async (req,res) =>{
    const Add = await new StatusRoom(req.body).save()
    res.json(Add)
}
export const update = async (req,res) =>{
    const edit = await StatusRoom.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}).exec()
    res.json(edit)
}
export const remove = async (req,res) =>{
    const edit = await StatusRoom.findOneAndDelete({_id:req.params.id}).exec()
    res.json(edit)
}
export const read = async (req, res) => {
    try {
        const room = await Room.findOne({_id: req.params.id}).exec()
        // console.log(category)
        const status = await StatusRoom.find({room: room}).populate('room').select().exec() 
        res.json({
            status
        })
    } catch (error) {
        
    }
}