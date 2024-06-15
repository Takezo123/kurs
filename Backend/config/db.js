import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.9ww5wjm.mongodb.net/dodoptica').then(()=>console.log("DB Connected"));
}