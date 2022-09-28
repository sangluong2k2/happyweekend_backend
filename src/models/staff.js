import mongoose,{Schema} from "mongoose";

const Staff = Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    idCard:{
        type: Number,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    national:{
        type: String,
        required:true
    }
      
}, {timestamps: true});

export default mongoose.model("Staff", Staff);