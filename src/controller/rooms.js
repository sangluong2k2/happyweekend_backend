import Room from "../models/room"
import Comment from "../models/comments"
import slugify from "slugify"
import DateBooked from "../models/dateBooked"

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

// check trùng lặp thời gian
function areTwoDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRange) {
    return incommingDateTimeRange.start < existingDateTimeRange.end && incommingDateTimeRange.end > existingDateTimeRange.start
}

function areManyDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRanges) {
    return existingDateTimeRanges.some((existingDateTimeRange) => areTwoDateTimeRangesOverlapping(incommingDateTimeRange, existingDateTimeRange))
}
  
 
export const search = async (req, res) => {
    const { checkInDate, checkOutDate } = req.body;

    if (!checkInDate || !checkOutDate) {
        res.json("vui lòng nhập thời gian checkin và checkout");
        return;
    }

    try {
        let result = [];

        const listDateBooked = await DateBooked.find().exec();
        const rooms = await Room.find().exec();

        rooms.forEach(room => {
            const dateBookedByRoom = listDateBooked.filter(item => item.room.toString() == room._id.toString());
            if (!dateBookedByRoom.length) {
                result.push(room);
            } else {
                const listDateByRoom = dateBookedByRoom.map(item => {
                    return {
                        start: new Date(item.dateFrom).getTime(),
                        end: new Date(item.dateTo).getTime()
                    };
                });

                // trạng thái phòng trống.
                const status = areManyDateTimeRangesOverlapping({
                    start: new Date(checkInDate).getTime(),
                    end: new Date(checkOutDate).getTime()
                }, listDateByRoom);

                if (!status) result.push(room);
            }
        })

        res.json(result);
    } catch (error) {
        res.status(404).json(error);
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