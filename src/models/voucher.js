import mongoose, { Schema } from "mongoose";


const VoucherSchema = Schema({
    code:{
        type: String,
        unique: true,
        uppercase:true,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    discount:{
        type: Number,
        required: true
    },
    activeTime:{
        type: Date,
        required:true
    },
    expriedTime:{
        type: Date,
        required: true
    },
    users:{
        type: Array,
        default: []
    },
    usersSendMail: {
        type: Array,
        default: []
    } // danh sách user id đã gửi mail thông báo voucher
},{timestamps: true})

export default mongoose.model("Voucher",VoucherSchema)