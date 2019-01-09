const express = require('express')
const app = new express();

const mongoose = require('mongoose');
const port = 8000

mongoose.connect('mongodb://localhost:27017/customers');
mongoose.connection.on('connected', () => {
  console.log('connected to mongod');
});

mongoose.connection.on('error', () => {
  console.log('failed to connect to mongod');
});

app.use(express.json())

app.use(require('./controllers'));

app.listen(port, () => console.log(`running on ${port}`));