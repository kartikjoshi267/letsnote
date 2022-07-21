const express = require('express');
const connectToDatabase = require('./dbconnect');
const cors = require('cors');
require('dotenv').config();
const auth = require('./routes/auth');
const notes = require('./routes/notes');

const port = process.env.PORT || 80;

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', auth);
app.use('/api/notes', notes);

// Heroku
if (process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}


app.listen(port, (error) => {
    console.log(`Server started successfully at http://letsnote.herokuapp.com:${port}`);
    connectToDatabase();
});