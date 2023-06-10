'use strict';

const axios = require('axios');
// const cache = require('./cache');

async function getCamping (req, res, next) {
  const { query, limit, activity } = req.query;
  const url = `https://ridb.recreation.gov/api/v1/campsites?query=${query}&${limit}&${activity}`;

  axios.get(url)
    .then(res => res.data.data.map(site => new Campsite(site)))
    .catch(err => next(err));
}

class Campsite {
  constructor(campingObj){
    this.site = campingObj.recdata.FacilityName;
    this.fee = campingObj.recdata.FacilityUseFeeDescription;
    this.description = campingObj.FacilityDescription;

  }
}

module.exports = getCamping;
