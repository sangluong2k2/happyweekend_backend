import mongoose, { Schema } from "mongoose";

const FacilitiesSchema  = Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type:String
    }
},{timestamps:true})
export default mongoose.model("Facilities", FacilitiesSchema)