//click handler to build the yelp reviews ?? Should we build up all of these reviews for Each before the User clicks the drop-down?

//function to build a Yelp review HTML element, which takes an object as input
function makeYelpList(arr){
	var yelpList= $('<ul>')
	yelpList.addClass("collection");

	arr.map(function(ele){
		var newYelpStuff= $('<li>')
		newYelpStuff.addClass("collection-item avatar");
		newYelpStuff.append('<img src="' + ele.img +'" alt="" class="yelpImage">');
		newYelpStuff.append('<span class = "title">' + ele.name + '</span>');
		newYelpStuff.append('<p>'+ele.address +'</p>');
		newYelpStuff.append('<img src="' + ele.rating_img +'" alt="" class="secondary-content">');
		yelpList.append(newYelpStuff);
	});

	return yelpList;
	
}