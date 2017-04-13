//finction to
function getYelpData(lat, long, term) {
    var yelpURL  = "v3/businesses/search?term=" + term + "&latitude=" + lat +"&longitude="+ long + "&sort_by=rating&limit=4";
    var arrReviews;

    return $.getJSON("https://fathomless-plains-61908.herokuapp.com/teamZuckerberg/" + yelpURL).then(function(response) {
        return response.businesses.map(function(ele) {
         return {
           img: ele.image_url,
           name: ele.name,
           address: ele.location.address1 + ", " + ele.location.zip_code,
           link: ele.url,
           rating: ele.rating
         }
      })
   })
};

//IN PROGRESS
function getRatingStars(float) {
  switch(float) {
    case 1:
      return {}
      break;
    case 1.5:
      return {}
      break;
    case 2:
      return {}
      break;
    case 2.5:
      return {}
      break;
    case 3:
      return {}
      break;
    case 3.5:
      return
      break;
    case 4:
      return
      break;
    case 4.5:
      return
      break;
    case 5:
      return
      break;
    default:
      return "null"
  }
}
