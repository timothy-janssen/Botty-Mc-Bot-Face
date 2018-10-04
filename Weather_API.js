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
    imageUrl: getImgURL(results.weather[0].id),
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
  switch(weatherID.toString().charAt(0)){
    case '2': //Thunderstorm 
      return 'https://images.all-free-download.com/images/graphiclarge/thunderstorm_weather_symbols_clip_art_17463.jpg';
      break;
    case '3': //Drizzle 
      return 'https://images.all-free-download.com/images/graphiclarge/sun_and_rain_weather_symbols_clip_art_9297.jpg';
      break;
    case '5': //Rain 
      return 'https://images.all-free-download.com/images/graphiclarge/rainy_weather_symbols_clip_art_9296.jpg';
      break;
    case '6': //Snow https://images.all-free-download.com/images/graphiclarge/christmas_snow_vector_289503.jpg 
      return 'https://images.all-free-download.com/images/graphiclarge/cute_weather_elements_vector_531726.jpg';
      break;
    case '7': //Atmosphere
      return '';
      break;
    case '8':
      switch(weatherID) {
        case 800: //clear sky   
          return 'https://images.all-free-download.com/images/graphiclarge/sunny_day_background_vector_311961.jpg';
          break;
        case 801: //few clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/weather_icon_312289.jpg';
          break;
        case 802: //scattered clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/white_clouds_in_a_blue_sky_312568.jpg';
          break;
        case 803: //broken clouds 
        case 804: //overcast clouds 
          return 'https://images.all-free-download.com/images/graphiclarge/realistic_clouds_vector_illustration_set_582707.jpg';
      }
  }
  return 'https://images.all-free-download.com/images/graphiclarge/thumb_up_sun_311907.jpg';
}

module.exports = getWeather();