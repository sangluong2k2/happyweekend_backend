import mongoose,{Schema, ObjectId} from "mongoose";

const dateBooked = Schema({
    dateFrom: {
        type: String,
        require
    },
    dateTo: {
        type: String,
        require
    },
    room:{
        type: ObjectId,
        ref:"Room"
    }
}, {timestamps: true})

export default mongoose.model("DateBooked",dateBooked)