import mongoose,{Schema} from "mongoose";

const categoryBlog = Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    image:{
        type: String,
        required:true
    },
    overnight:{ 
        type:Number,
        required:true
    },
    daytime:{ 
        type:Number,
        required:true
    },
    dayprice:{ 
        type:Number,
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
        
    }
}, {timestamps:true})

export default mongoose.model("CategoryBlog", categoryBlog)