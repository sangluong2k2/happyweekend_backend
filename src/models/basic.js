import mongoose,{Schema} from "mongoose";

const basicSchema = Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    address:{
        type: String,
        required:true
    }
}, {timestamps:true})

export default mongoose.model("Basic", basicSchema)