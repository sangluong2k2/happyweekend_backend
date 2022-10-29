import mongoose,{Schema, ObjectId} from "mongoose";



const RomSchema = Schema({
    name:{
        type:String,
        required:true,
        minLength: 5
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    image:{
        type:String,
    },
    price: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
        minLength:5
    },
    status: {
        type: Number
    },
    category:{
        type: ObjectId,
        ref:"Category"
    }
}, {timestamps: true})

export default mongoose.model("Room",RomSchema)