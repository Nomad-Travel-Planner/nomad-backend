'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const airbnb = require('./modules/airbnb');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.status(200).send('I\'m working!');
});

app.get('/airbnb', airbnb);

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

// Catches all server errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
