//click handler to build the yelp reviews ?? Should we build up all of these reviews for Each before the User clicks the drop-down?
function suggestionClickHandle() {
	console.log("run!")
	$(".suggestion-item").on("click", function() {
		console.log("clicked");
		getYelpData(weatherWithSuggest.lat, weatherWithSuggest.long, "Lakes")
			.then(function(response) {
				 $(this).siblings(".collapsible-body").append(makeYelpList(response));
			})
	});
}

//function to build a Yelp review HTML element, which takes an object as input
function makeYelpList(arr) {
	var yelpList= $('<ul>');
	yelpList.addClass("collection");

	arr.map(function(ele){
		var newYelpStuff= $('<li>')
		newYelpStuff.addClass("collection-item avatar");
		newYelpStuff.append('<img src="' + ele.img +'" alt="" class="yelpImage circle">');
		newYelpStuff.append('<h6 class = "title left-align"><a target="_blank" class="left-align" href="' + ele.link + '">' + ele.name + '</a></h6>');
		newYelpStuff.append('<p class="left-align">'+ele.address +'</p>');
		newYelpStuff.append('<img src="' + ele.rating_img +'" alt="" class="secondary-content">');
		yelpList.append(newYelpStuff);
	})
	return yelpList
};
