import mongoose,{Schema} from "mongoose";

const categoryBlog = Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
        
    }
}, {timestamps:true})

export default mongoose.model("CategoryBlog", categoryBlog)