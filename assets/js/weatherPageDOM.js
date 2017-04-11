//click handler to take input from the user, then call getWeatherData, getSuggestions, and dispWeather.
$("#submit").on("click", function() {
  event.preventDefault();
    var input  = $("#location").val().trim();
    if (input.length > 0) {
      getWeatherData(input)
        .then(function(weatherData) {
          weatherWithSuggest = getSuggestions(weatherData)
          dispWeather(weatherWithSuggest, $("#submit").attr("data-forecast-day"));
          $("main").fadeTo(300, 1)
        });
    }
    else {
      //alert that they need to enter a location AND select a date
    }
});

//click handler to control the 'date-btn buttons, including their styling and manipulation of the data attributes 
$(".date-btn").on("click", function(event) {
  var thoseButtons = $(".date-btn");
  var thisButton = $(event.target);

  thoseButtons.removeClass("darken-2");
  thoseButtons.removeAttr("style");
  thoseButtons.attr("data-selected", "false");

  thisButton.css("box-shadow", "none");
  thisButton.addClass("darken-2");
  thisButton.attr("data-selected", "true");

  $("#submit").attr("data-forecast-day", thisButton.attr("data-day"))
})

//function to display the carosuel with each forecast panel, and set the carosuel to the button corresponding to the index
function dispWeather(obj, idx) {
  $("#forecast-container").empty();
  $("#suggestions-container").empty();
  carouselInit();

  $("#pretty-address").html("<i class='material-icons red-text'>&#xE55F;</i>  " + obj.prettyAddress)
  obj.arrForcast.forEach(function(ele, idx) {
     //create forecast div
    var panelItem = $("<div>");
    panelItem.addClass("carousel-item indigo accent-3 white-text");
    panelItem.attr("data-forecast-day", idx);

    panelItem.append(makeForecastPanel(ele));

    $(".carousel").append(panelItem)
  })

  //initialized the carosuel behavior, including calling makeSuggestionsList for the particular day
  $('.carousel').carousel({fullWidth: true, onCycleTo:function(data) {
    $("#suggestions-container").empty();
    $("#suggestions-container").append(makeSuggestionsList(weatherWithSuggest.arrForcast[$(data).attr("data-forecast-day")].suggestions));

    if ($(data).attr("day") === "0") {
      $("#next-day").addClass("disabled")
    }
    else if ($(data).attr("day") === "9") {
      $("#prev-day").addClass("disabled")
  }
    else {
      $("#next-day").removeClass("disabled")
      $("#prev-day").removeClass("disabled")
    }
  }});

      $('.carousel').carousel('set', idx);
}

//function which takes in a forecast object and returns formatted HTML forecast with content
function makeForecastPanel(obj) {
  var forecastDiv = $("<div>");
  var forecastSimpleDiv = $("<div>");
  var forecastDetailedDiv = $("<div>");
  var forecastIconDiv = $("<div>");

  //create the overall forecast div and add its constituent parts
  forecastDiv.addClass("forecast-wrapper container white-text");
    forecastDiv.append("<p>"+ obj.date.weekday + "</p>")
    forecastDiv.append("<h5 class='forecast-date'>" + obj.date.monthname + " " + obj.date.day + ", " + obj.date.year + "</h5>")
    forecastDiv.append(forecastSimpleDiv);
    forecastDiv.append(forecastDetailedDiv);

  //create the simple forecast (icon and weather description)
  forecastSimpleDiv.addClass("forecast-simple");
    //add the background image to the 'icon' div and append it
    forecastIconDiv.addClass("forecast-icon")
    forecastIconDiv.css("background-image", "url(" + obj.icon_url + ")")
    forecastSimpleDiv.append(forecastIconDiv)
    forecastSimpleDiv.append("<h2 class='forecast-conditions center'>" + obj.conditions + "</div>")

  //create the detailed forecast div and populate with data
  forecastDetailedDiv.addClass("forecast-detailed");
    forecastDetailedDiv.append("<p class=' flow-text forecast-text'>" +  obj.forecastText
    + "</p>")
    forecastDetailedDiv.append("<h2 class='forecasttemp'>H "+ obj.high.fahrenheit + "° / L " + obj.low.fahrenheit + "° </h2>");
    forecastDetailedDiv.append("<p class='forecast-winds'>Winds " + obj.avewind.dir +" " + obj.avewind.mph + " mph</p>")

  return forecastDiv
}

//function to return an HTML list of the suggestions for a particular day
function makeSuggestionsList(arr){
  var collectionList = $("<ul>")
  collectionList.id="suggestion";
  collectionList.addClass("collection with-header");
  collectionList.append("<li class='collection-header grey darken-3 blue-text center'><h5>Local Spots</h5></li>");


  arr.forEach(function(ele){
    var collectionItem = $("<li>")
    collectionItem.html("<a href='#' class='collection-item btn btn-wave'>" + ele + "</a>");
    collectionList.append(collectionItem);
  });
  return collectionList;
};

//function to create a new carousel (to avoid the blank issue)
function carouselInit() {
  var carouselTemplate = "<div class='col s12 center-align grey darken-3 white-text'><h4 id='pretty-address'></h4></div><div class='carousel carousel-slider center valign-wrapper' data-indicators='true'id='weather-slider'><a class='waves-effect valign left-align' id='prev-day'><i class='material-icons'>&#xE314;</i></a><a class='waves-effect valign right-align' id='next-day'><i class='material-icons'>&#xE315;</i></a>"

  $("#forecast-container").append(carouselTemplate);

  //two click handlers to move the carosuel to the next/previous day
  $("#prev-day").on("click", function() {
      $('.carousel.carousel-slider').carousel('prev');
  })

  $("#next-day").on("click", function() {
    $('.carousel.carousel-slider').carousel('next');
  })
}
