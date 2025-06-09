const mongoose=require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connection success');
    } catch (err) {
        console.log('DB connection fail');
        console.log(err)
    }
}

module.exports=connectDB