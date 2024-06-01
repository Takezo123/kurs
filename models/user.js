import mongoose from'mongoose';
import jwt from 'jsonwebtoken'; //npm install jsonwebtoken
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,

    },
    avatarUrl: String,},

{
    timestamps: true,
    },
);
export default mongoose.model('User', userSchema);