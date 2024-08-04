import mongoose from "mongoose";
const connectToDataBas= ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    console.log("CONNECTED TO DATABASE");
    
};

export default connectToDataBas