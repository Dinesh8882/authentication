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
        enum:['admin','user'],
        default:"user"
    }
})

const userModel = mongoose.model("user", userShema)

export default userModel;