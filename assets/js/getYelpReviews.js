function getYelpData() {
    var yelpURL  = "v3/businesses/search?term=starbucks&latitude=37.786882&longitude=-122.39997";

   $.ajax({
        method: 'GET',
        url: "https://fathomless-plains-61908.herokuapp.com/teamZuckerberg/" + yelpURL,
    })
    .done(function (data) {
      console.log(data);
    })
}
