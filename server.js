'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const getCamping = require('./modules/camping');
const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send('I\'m working!');
});

app.get('/camping', getCamping);

app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
