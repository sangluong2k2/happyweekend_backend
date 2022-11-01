import mongoose, {Schema} from "mongoose";

const ImageSchema = Schema({
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("ImageRoom",ImageSchema)