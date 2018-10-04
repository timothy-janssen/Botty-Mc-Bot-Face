// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const weather_API = require('./Weather_API.js');

const app = express();
app.use(bodyParser.json());

// Recast will send a post request to /errors to notify errors
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});

//The bot is asking us for weather data, our time to shine!
app.post('/get-weather', (req, res) => {
  console.log('[POST] /get-weather');
  const memory = req.body.conversation.memory;
  const city = memory.location.formatted;

  console.log('Fetching data for ' + city);
  //Call our get weather function and return the data to Recast
  return getWeather(city)
    .then((card) => res.json({
      replies: card,
    }))
    .catch((err) => console.error('weatherAPI::getWeather error: ', err));
 });

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));