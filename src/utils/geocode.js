const request = require('request');

// Geocoding
// Address -> Lat/Long -> Weather
const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiZGV2aW5zYnQiLCJhIjoiY2p1dWw5cjl5MGs0ZjQ0cGgwbnB4MWU4aCJ9.liqHCQ5-QUvbr5cIuG-goQ&limit=1';

  /** NOTES:
   * body : destructed for response
   * Setting the parameter of callback to (error, response, body)
   * will work as well.
   * */

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      };
      // data will be destrcuted in the callback function definition in app.js
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
