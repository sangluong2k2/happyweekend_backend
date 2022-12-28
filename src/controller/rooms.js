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
function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("/");
  }
  
 
  //-> "2011-06-08"
  export const search = async (req, res) => {

    var checkIn = req.query.dateFrom;
    checkIn = convert(checkIn);

    var checkOut = req.query.dateTo;
    checkOut = convert(checkOut);
    console.log(checkIn,checkOut)
    try {
        const bookedRooms = await dateBooked.find({
            dateFrom: { $gte: new Date(checkIn) },
            dateTo: { $lte: new Date(checkOut) }
        }).exec()
        // console.log(bookedRooms);
        let bookedRoomId = bookedRooms.map((item) => item.room);
        const enqBookRoomId = _.uniq(bookedRoomId);
        await Room.find().exec().then((result) => {
            let _rooms = _.cloneDeep(result)
            if (!(checkOut === 'null')) {
                _rooms.map((item, index) => {
                    enqBookRoomId.map((idItem) => {
                        if (JSON.stringify(item._id) == JSON.stringify(idItem)) {
                            _rooms.splice(index, 1);
                        }
                    })
                    if (index === _rooms.length - 1) {
                        res.json(_rooms)
                    }
                })
            }
            else {
                res.json(result)
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json([])
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