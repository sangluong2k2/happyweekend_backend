import mongoose,{Schema} from "mongoose";

const categoryRoom = Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    image:{
        type: String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
        
    }
}, {timestamps:true})

export default mongoose.model("Category", categoryRoom)