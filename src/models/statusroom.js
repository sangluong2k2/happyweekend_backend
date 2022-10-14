import mongoose,{Schema, ObjectId} from "mongoose";


const StatusSchema = Schema({
    checkins:{
        type: String,
    },
    checkouts:{
        type: String,
    },
    room:{
        type: ObjectId,
        ref:"Room"
    },
}, {timestamps: true})

export default mongoose.model("Statusroom",StatusSchema)