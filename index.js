// index.js
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const weather_API = require('./Weather_API.js');

const app = express();
app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});


app.post('/get-weather', (req, res) => {
  console.log('[POST] /get-weather');
  const memory = req.body.conversation.memory;
  const city = memory.location;

  const cityId = getCityId(city.formatted);

  return getWeather(city.formatted)
    .then((card) => res.json({
     replies: card,
    }))
    .catch((err) => console.error('weatherAPI::getWeather error: ', err));
 });


app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));


function getCityId(name){
  return 2172797;
}