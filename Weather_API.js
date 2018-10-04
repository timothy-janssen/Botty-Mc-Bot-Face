// Weather_API.js
const axios = require('axios');
const config = require('./config.js');

getWeather = function (city_ID) {
 return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city_ID}&APPID=${config.WEATHER_TOKEN}`, {

 }).then(response => {


   results = response.data
   if (results.length === 0) {
    return [{
     type: 'quickReplies',
     content: {
         title: 'Sorry, but I could not find any results for your request :(',
         buttons: [{ title: 'Start over', value: 'Start over' }],
      },
    }];
   }
   console.log(results);

   const card = {
    title: results.name,
    subtitle: results.weather[0].description + ' and ' + results.main.temp,
    imageUrl: getImgURL(results.weather.id),
    buttons: []
   };


   console.log(card);
   return [
     {
       type: 'text',
       content: "Here's what I found for you!",
     },
     { type: 'card', content: card },
   ];
  });
}

function getImgURL(weatherID){
  return 'http://openweathermap.org/img/w/' + weatherID + '.png';
  //return 'https://images.all-free-download.com/images/graphiclarge/weather_symbols_clip_art_17459.jpg';
}

module.exports = getWeather();