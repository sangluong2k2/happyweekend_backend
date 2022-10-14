import mongoose,{Schema,ObjectId} from "mongoose";

const orderSchema = Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    statusorder:{
        type:String
    },
    total:{
        type:Number
    },
    checkins:{
        type: String,
    },
    checkouts:{
        type: String,
    },
    room:{
        type: ObjectId,
        ref:"Room"
    },
    user:{
        type: ObjectId,
        ref:"Users"
    },
    // status:{
    //     type: ObjectId,
    //     ref:"Statusroom"
    // },
}, {timestamps:true})


export default mongoose.model("Order", orderSchema)