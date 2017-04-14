
//Function to use convert user inut into simple object with formatted address(prettyAddress) and forecast (arrForcast);
function getWeatherData(loc) {
    var prettyAddress;
    var strLatLong;
    var arrForcast;
    var lat;
    var long;


    //Returns a Promise (API call to Google with Geocaching to get Lat/Lng strng)...
    return $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(loc), function(response) {
            lat = response.results[0].geometry.location.lat;
            long = response.results[0].geometry.location.lng;
            prettyAddress = response.results[0].formatted_address
            strLatLong = lat + "," + long;
        })
        //Which is passed to .then, which returns a Promise
        .then(function() {
            return $.getJSON("https://api.wunderground.com/api/e57aa96ff1c09b96/forecast10day/q/" + encodeURIComponent(strLatLong) + ".json", function(response) {
                arrForcast = response.forecast.simpleforecast.forecastday;

                arrForcast.forEach(function(ele) {
                  ele.icon_url = getWeatherIcon(ele.icon);
                })

                arrText = response.forecast.txt_forecast.forecastday.filter(function(ele, index){
                  return index % 2 === 0;
                }).map(function(ele) {
                    return ele.fcttext
                  })
              arrText.forEach(function(ele, index) {
                arrForcast[index].forecastText = ele;
              })
            })
            .then(function(yelpData) {
                return {
                    prettyAddress: prettyAddress,
                    lat: lat,
                    long: long,
                    arrForcast: arrForcast
                };
            });
        });
};

//function to return a modified version of the WeatherData Object with suggestions attached to each forecast element
function getSuggestions(obj) {
  var weatherWithSuggestions = obj.arrForcast.map(function(ele) {
    switch (ele.icon) {
      case "clear": case "sunny": case "mostlysunny": case "partlysunny": case "mostlycloudy": case "partlycloudy":
        ele.suggestions = [
          {text:"...find a park/hiking trail", term: "parks"},
          {text:"...see a Concert", term: "concert venue"},
          {text:"...find a golf course", term: "golf"},
          {text:"...swim in a Lake", term: "lake"},
          {text:"...find a Wine Tasting", term: "Wine"},
          {text:"...hang at a Brewery", term: "brewery"},
        ]
        return ele;
      case "cloudy": case "chancerain":case "rain": case "fog": case "hazy": case "chancetstorms":
        ele.suggestions = [
          {text:"...find a nice Cafe/bar", term:"cafe,bar"},
          {text:"...go see a movie", term: "movie theater"},
          {text:"...learn stuff at Museum", term:"museum"},
          {text:"...get cultured at a Theatre", term:"theatre"},
          {text:"...hit the Gym", term:"gym"}];
        return ele;
      case "sleet":	case "snow":  case "flurries":  case "chanceflurries":  case "chancesleet":	case "chancesnow":
        ele.suggestions = [
        {text:"...order some Takeout (Pizza maybe?)", term:"takeout,pizza"},
        {text:"...rent a Movie", term:"movie"},
        {text:"...find a nice Cafe/bar", term:"cafe,bar"},
        {text:"...find a ski shop", term:"ski shop"},
        {text:"...stock up for the Snowpocolypse", term:"grocery,costco,target"}];
        return ele;
      default:
        ele.suggestions = ["...honestly I'm not sure... feeling lucky?"]
        return ele;
      }
    });
  obj.arrForcast = weatherWithSuggestions
  return obj
}

//function which takes in a string (forecast icon indicator, and returns the URL to the correct forecast image);
function getWeatherIcon(str) {
  switch (str) {
    case "clear": case "sunny":
      return "assets/images/md-weather-iconset/weather-clear.png"

    case "mostlysunny": case "partlysunny": case "partlycloudy":
      return"assets/images/md-weather-iconset/weather-few-clouds.png"

    case "mostlycloudy": case "cloudy": case "hazy":
      return"assets/images/md-weather-iconset/weather-clouds.png"

    case "fog":
      return"assets/images/md-weather-iconset/weather-fog.png"

    case "chancerain":
      return"assets/images/md-weather-iconset/weather-drizzle-day.png"

    case "rain":
      return"assets/images/md-weather-iconset/weather-showers-day.png"

    case "chancetstorms":
      return"assets/images/md-weather-iconset/weather-storm-day.png"
    case "tstorms":
      return"assets/images/md-weather-iconset/weather-storm.png"

    case "chancesleet": case "sleet":
      return"assets/images/md-weather-iconset/weather-hail.png"

    case "chanceflurries": case "flurries":
      return"assets/images/md-weather-iconset/weather-snow-scattered-day.png"

    case "chancesnow": case "snow":
      return"assets/images/md-weather-iconset/weather-snow.png"

    default:
      return"assets/images/md-weather-iconset/weather-none-available.png"
  }
  obj.icon_url
}
