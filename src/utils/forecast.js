const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/fb403b816796e426112330ad8ba6f286/' +
    latitude +
    ',' +
    longitude +
    '?units=si';

  // body : destructed for response
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // Low level OS error such as no internet connection
      callback('Unable to connect to weather serivce', undefined);
    } else if (body.error) {
      // Error where 'error' variable return null, but
      // the the request gives invalid response, such as coordinate pair
      callback('Unable to find location', undefined);
    } else {
      console.log(body.daily.data[0]);
      const temp = body.currently.temperature;
      const rainProb = body.currently.precipProbability;

      callback(
        undefined,
        `${
          body.daily.data[0].summary
        }. It is currently ${temp} degrees out. There is ${rainProb}% chance of rain.
          Humidity  : ${body.daily.data[0].humidity * 100}% 
          Wind Speed: ${body.daily.data[0].windSpeed} km/h 
          Pressure  : ${body.daily.data[0].pressure} hPa 
          UV Index  : ${body.daily.data[0].uvIndex}`
      );
    }
  });
};

module.exports = forecast;
