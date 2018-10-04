// Weather_API.js
const axios = require('axios');
const config = require('./config.js');

getWeather = function (city) {
 return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&APPID=${config.WEATHER_TOKEN}`, {
 }).then(response => {
   results = response.data
   // Nothing found
   if (results.length === 0) {
    return [{
     type: 'quickReplies',
     content: {
         title: 'Sorry, but I could not find any results for your request :(',
         buttons: [{ title: 'Start over', value: 'Start over' }],
      },
    }];
   }

   //Extract the data from the response and format it for Recast
   const card = {
    title: results.name,
    subtitle: results.weather[0].description + ' and ' + results.main.temp,
    imageUrl: getImgURL(results.weather[0].id),
    buttons: []
   };

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
  // weather codes returned by the API are 3 digit numbers, the first digit indicates the type
  switch(weatherID.toString().charAt(0)){
    case '2': //Thunderstorm 
      return 'https://images.all-free-download.com/images/graphiclarge/thunderstorm_weather_symbols_clip_art_17463.jpg';
    case '3': //Drizzle 
      return 'https://images.all-free-download.com/images/graphiclarge/sun_and_rain_weather_symbols_clip_art_9297.jpg';
    case '5': //Rain 
      return 'https://images.all-free-download.com/images/graphiclarge/rainy_weather_symbols_clip_art_9296.jpg';
    case '6': //Snow 
      return 'https://images.all-free-download.com/images/graphiclarge/cute_weather_elements_vector_531726.jpg';
    case '7': //Atmosphere
      return '';
    case '8':
      // '8' has many different subtypes
      switch(weatherID) {
        case 800: //clear sky   
          return 'https://images.all-free-download.com/images/graphiclarge/sunny_day_background_vector_311961.jpg';
        case 801: //few clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/weather_icon_312289.jpg';
        case 802: //scattered clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/white_clouds_in_a_blue_sky_312568.jpg';
        case 803: //broken clouds 
        case 804: //overcast clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/realistic_clouds_vector_illustration_set_582707.jpg';
      }
  }
  //Default return
  return '';
}

module.exports = getWeather();