import Room from "../models/room"
import slugify from "slugify"
import imagesroom from "../models/imagesroom"
import dateBooked from "../models/dateBooked"
import _ from "lodash"

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
        const room = await Room.find({ slug: req.params.slug }).exec()
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
        const rooms = await Room.find().exec();
        const bookedRooms = await dateBooked.find({
            dateFrom: { $gte: checkIn },
            dateTo: { $lte: checkOut }
        }).exec()
        if (!(checkOut === 'null')) {
            let bookedRoomId = bookedRooms.map((item) => JSON.stringify(item.room));
            const enqBookRoomId = _.uniq(bookedRoomId);
            rooms.forEach((item, index) => {
                enqBookRoomId.map((idItem) => {
                    if (JSON.stringify(item._id) == idItem) {
                        rooms.splice(index, 1);
                    }
                })
                // var evens = _.remove([...rooms], function (itemId) {
                //     return item == itemId;
                // });
                // console.log(evens)
                if (index === rooms.length - 1) {
                    res.json(rooms)
                }
            })
        }
        else {
            res.json(rooms)
        }
    } catch (error) {

    }
}

