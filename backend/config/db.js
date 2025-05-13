import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_COMPASS_URI);
        console.log("Sucessfully connected to server")
    } catch(err){
        console.log("Error in DB Connection");
            console.log(err);
            process.exit(1);
    }
}

export default connectDB;