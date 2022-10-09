import mongoose, { Schema } from "mongoose";
import {createHmac} from "crypto"

const users = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
users.methods = {
    authenticate(password) {
        return this.password == this.encrytPassword(password);
    },
    encrytPassword(password) {
        if (!password) return
        try {
            return createHmac('sha256', "abc").update(password).digest('hex');
        } catch (error) {
            console.log(error);
        }
    }
}
users.pre("save", function (next) {
    try {
        this.password = this.encrytPassword(this.password);
        next();
    } catch (error) {

    }
})
export default mongoose.model("Users", users);
