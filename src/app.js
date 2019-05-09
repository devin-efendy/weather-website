// Requires from utils/
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs'); // We need to differentiate between partials and render

const app = express(); // This generate an instance of the application

// To join all given PATH SEGMENTS
// Define paths for Express config
const publicPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
// Set up Partials
const partialsPath = path.join(__dirname, '../templates/partials'); // Part of partials setup

/** Handlebars, hbs is an express extension that integrate handlebars with express
 * Use handle bars if you want to make more complex and dynamic website
 * With Handlebars we'll be able to render dynamic content and allow reuse pieces of markup
 * tl;dr The purpose of handlebars is to generate templates
 */
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// registerPartials: provides a quick way to load all partials from a specific directory:
hbs.registerPartials(partialsPath); // Part of partials

/** Static Note
 * This is finding the static assets in the public directory (or the root)
 * the root directory serve static assets **(such as index.html)
 * static means non-changing file
 */
// Setup static directory to serve.
app.use(express.static(publicPath));

app.get('', (req, res) => {
  // The name need to match up with the template which is index.hbs
  // Then render will convert it to .html file
  res.render('index', {
    title: 'Weather',
    name: 'Devin Efendy'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Devin Efendy'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'F.A.Q',
    name: 'Devin Efendy'
  });
});

app.get('/weather', (req, res) => {
  debugger;
  const address = req.query.address;

  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    });
  }
  // Destructuring data passed to callback function from geocode.js
  // Default parameter {...} = {}
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  // Care for calling the res.send() twice
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Helo article not found',
    title: '404',
    name: 'Devin Efendy'
  });
});

// '*' wildcard character
app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Devin Efendy'
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
