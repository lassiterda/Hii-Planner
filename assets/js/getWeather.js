var prettyAddress;
var arrForcast;

$("#submit").on("click", function(event) {
  event.preventDefault();
  var input  = $("#location").val().trim();
   $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(input), function(response) {
      prettyAddress = response.results[0].formatted_address
      var strLatLong = response.results[0].geometry.location.lat +","+response.results[0].geometry.location.lng;

      $.getJSON("https://api.wunderground.com/api/e57aa96ff1c09b96/forecast10day/q/" + encodeURIComponent(strLatLong) + ".json", function(response) {
        arrForcast = response.forecast
         console.log(response.forecast.simpleforecast.forecastday)
      })
   });




});
