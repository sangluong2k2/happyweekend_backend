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
    price: [{
        brand:Number,
        title:String,
        value:Number
    }],
    description:{
        type: String,
        // required: true,
        minLength:5
    },
    status:{
        type:Boolean
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