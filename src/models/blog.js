import mongoose,{Schema, ObjectId} from "mongoose";


const BlogSchema = Schema({
    slug:{
        type:String,
        // required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    image:{
        type:String,
    },
    category:{
        type: ObjectId,
        ref:"CategoryBlog"
    }
}, {timestamps: true})

export default mongoose.model("Blog",BlogSchema)