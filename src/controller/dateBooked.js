import DateBooked from "../models/dateBooked"
// import Basic from "../models/basic"
import slugify from "slugify"

export const creat = async (req, res) => {
    try {
        const add = await DateBooked(req.body).save()
        res.json(add)
    } catch (error) {

    }
}
export const getAll = async (req, res) => {
    try {
        const date = await DateBooked.find().exec()
        res.json(date)
    } catch (error) {

    }
}

export const getOne = async (req, res) => {
    try {
        const room = await DateBooked.find({ slug: req.params.slug }).exec()
        res.json(room[0])
    } catch (error) {

    }
}


export const remove = async (req, res) => {
    try {
        const deleteRomm = await DateBooked.findOneAndDelete({ _id: req.params.id }).exec()
        res.json(deleteRomm)
    } catch (error) {

    }
}

export const update = async (req, res) => {
    req.body.slug = slugify(req.body.name)
    try {
        const newRoom = await DateBooked.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
        res.json(newRoom)
    } catch (error) {

    }
}

export const search = async (req, res) => {
    console.log(req.query);
    try {
        const rooms = await DateBooked.find({
            // name: name_search,
            status: {$gt : 0}
        }).exec()
        res.json(rooms)
    } catch (error) {
    }
}

