const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_HOSTNAME, (error) => {
        if (error){
            console.log(error);
            return;
        }

        console.log("Connected to MongoDB successfully");
    })
}

module.exports = connectToDatabase;