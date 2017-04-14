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

//IN PROGRESSgit
function getRatingStars(float) {
  switch(float) {
    case 1:
      return "assets/images/regular_1.png"
      break;
    case 1.5:
      return "assets/images/regular_1_half.png"
      break;
    case 2:
      return "assets/images/regular_2.png"
      break;
    case 2.5:
      return "assets/images/regular_2_half.png"
      break;
    case 3:
      return "assets/images/regular_3.png"
      break;
    case 3.5:
      return "assets/images/regular_3_half.png"
      break;
    case 4:
      return "assets/images/regular_4.png"
      break;
    case 4.5:
      return "assets/images/regular_4_half.png"
      break;
    case 5:
      return "assets/images/regular_5.png"
      break;
    default:
      return "assets/images/regular_0.png"
      break;
  }
}
