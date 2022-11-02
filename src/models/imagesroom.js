import mongoose, {Schema, ObjectId} from "mongoose";

const ImageSchema = Schema({
    image:{
        type:[],
        required:true
    },
    room: {
        type: ObjectId,
        ref: "room"
    }
},{timestamps:true})

export default mongoose.model("ImageRoom",ImageSchema)