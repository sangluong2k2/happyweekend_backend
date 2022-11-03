import mongoose, { Schema, ObjectId } from "mongoose";
import room from "./room";

const FacilitiesSchema  = Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String
    },
    room: {
        type: ObjectId,
        ref: room
    }
},{timestamps:true})
export default mongoose.model("Facilities", FacilitiesSchema)