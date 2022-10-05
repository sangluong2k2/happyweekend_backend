import mongoose,{Schema, ObjectId} from "mongoose";



const StatusSchema = Schema({
    timebegin:{
        type:Date,
    },
    timeend:{
        type:Date,
    },
    daybegin:{
        type:Date,
    },
    dayend:{
        type:Date,
    },
    room:{
        type: ObjectId,
        ref:"Room"
    },
}, {timestamps: true})

export default mongoose.model("Statusroom",StatusSchema)