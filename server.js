// Dependencies

const express = require('express');
const path = require('path');
const db = require('./db/db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// Sets up the Express App

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder static
app.use(express.static('public'));

// get data from file
const notesData = JSON.parse(fs.readFileSync('./db/db.json'));

// html routes
//// main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//// notes route
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// api routes

//// GET notes
app.get('/api/notes', (req, res) => res.json(notesData));

//// POST notes
app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  notesData.push(req.body);
  res.json(notesData);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
});


// start server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));