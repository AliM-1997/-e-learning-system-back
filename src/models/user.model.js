import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
export default User;
