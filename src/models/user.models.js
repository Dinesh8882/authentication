import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['admin','seller','customer'],
        default:"customer"
    }
})

const userModel = mongoose.model("user", userShema)

export default userModel;