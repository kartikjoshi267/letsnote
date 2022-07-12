const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectToDatabase = () => {
    console.log(process.env.DB_HOSTNAME);
    mongoose.connect(process.env.DB_HOSTNAME, {
        dbName: "test"
    }).then(() => {
        console.log("Connected to MongoDB successfully");
    });

}

module.exports = connectToDatabase;