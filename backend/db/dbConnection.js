import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection",error);
    }
};