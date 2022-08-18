const express = require('express');
const connectToDatabase = require('./dbconnect');
const cors = require('cors');
require('dotenv').config();
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const counter = require('./routes/counter');
const path = require('path')

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', auth);
app.use('/api/notes', notes);
app.use('/api/count', counter);

// Heroku
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
else{
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}


app.listen(port, (error) => {
    console.log(`Server started successfully on port ${port}`);
    connectToDatabase();
});
