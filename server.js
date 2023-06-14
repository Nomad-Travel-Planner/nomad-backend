'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const airbnb = require('./modules/airbnb');
const getCamping = require('./modules/camping');
const travelRoutes = require('./modules/travelRoutesHandler');
const verifyUser = require('./modules/authorize');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.get('/', (req, res) => {
  res.status(200).send('I\'m working!');
});

// verifies user on every route. If user isn't logged in, throws error. If logged in, stores user in req.user
app.use(verifyUser);

app.get('/airbnb', airbnb);

app.get('/travel-routes', travelRoutes.getTravelRoutes);
app.get('/travel-routes/:id', travelRoutes.getOneTravelRoute);
app.post('/travel-routes', travelRoutes.addTravelRoute);
app.patch('/travel-routes/:id', travelRoutes.editTravelRoute);
app.delete('/travel-routes/:id', travelRoutes.deleteTravelRoute);

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

// Catches all server errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.get('/camping', getCamping);


app.listen(PORT, ()=> console.log(`listening on ${PORT}`));
