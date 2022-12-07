import Room from "../models/room"
import Comment from "../models/comments"
import slugify from "slugify"
import imagesroom from "../models/imagesroom"
import dateBooked from "../models/dateBooked"

export const creat = async (req, res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const add = await Room(req.body).save()
        res.json(add)
    } catch (error) {

    }
}
export const getAll = async (req, res) => {
    try {
        const room = await Room.find().exec()
        res.json(room)

    } catch (error) {
        console.log(error);
    }
}

export const getOne = async (req, res) => {
    try {
        const room = await Room.find({ slug: req.params.slug }).populate('category').exec()
        res.json(room[0])
    } catch (error) {

    }
}


export const remove = async (req, res) => {
    try {
        const deleteRomm = await Room.findOneAndDelete({ _id: req.params.id }).exec()
        res.json(deleteRomm)
    } catch (error) {

    }
}

export const update = async (req, res) => {
    try {
        const newRoom = await Room.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        console.log(newRoom);
        res.json(newRoom)
    } catch (error) {

    }
}

export const search = async (req, res) => {
    const checkIn = req.query.dateFrom;
    const checkOut = req.query.dateTo;
    try {
        const rooms = await dateBooked.find({
            dateFrom: { $eq: checkIn },
            dateTo: { $eq: checkOut }
        }).exec()
        res.json(rooms)
    } catch (error) {

    }
}

export const read = async (req,res) => {
    try {
        const room = await Room.findOne({slug: req.params.slug}).exec();
        const comments = await Comment.find({room: room}).populate('room').select('-room').exec()
        res.json({
            comments
        });
    } catch (error) {
        
    }
}