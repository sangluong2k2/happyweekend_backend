import mongoose,{Schema, ObjectId} from "mongoose";



const RomSchema = Schema({
    name:{
        type:String,
        // required:true,
        minLength: 5
    },
    slug:{
        type:String,
        // required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    image:{
        type: [],
    },
    price: {
        type: Number,
        // required: true,
    },
    description:{
        type: String,
        // required: true,
        minLength:5
    },
    coc: {
        type: Boolean,
        default: false
    },
    category:{
        type: ObjectId,
        ref:"Category"
    },
    date: {
        type: ObjectId,
        ref: "dateBooked"
    },
    facilities:{
        type: ObjectId,
        ref: "Facilities"
    }
}, {timestamps: true})

export default mongoose.model("Room",RomSchema)