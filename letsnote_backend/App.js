const express = require('express');
const connectToDatabase = require('./dbconnect');
const cors = require('cors');
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const port = 5000;

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', auth);
app.use('/api/notes', notes);

app.listen(port, (error) => {
    console.log(`Server started successfully at http://localhost:${port}`);
    connectToDatabase();
});