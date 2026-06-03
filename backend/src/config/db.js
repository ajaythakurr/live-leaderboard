import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB  connected: ${conn.connection.host}`);
    }catch(err){
        console.log("error while connecting to the mongoDB ",error.message);
        process.exit(1);
    }
}
export default connectDB;