import mongoose, {Schema, ObjectId} from "mongoose";

const comments = Schema({
    comment:{
        type: String,
        required:true
    },
    user:{
        type: ObjectId,
        ref:"User"
    },
    room:{
        type: ObjectId,
        ref:"Room"
    },
    star:{
        type: String,
        required: true
    }
}, {timestamps:true})

export default mongoose.model("Comment", comments)