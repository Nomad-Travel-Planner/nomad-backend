'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send('I\'m working!');
});

app.listen(PORT, ()=> console.log(`listenging on ${PORT}`));
