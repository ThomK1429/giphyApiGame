

$(document).ready(function() {


	// Initial array of scientists
	var scientists = ['Einstein', 'Curie', 'Newton', 'Edison'];



	// ========================================================

	function displayMovieInfo(){

		var movie = $(this).attr('data-name');
		alert("button clicked " + movie);
		var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	// Creates AJAX call for the specific movie being 
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			// Creates a generic div to hold the movie
			var movieDiv = $('<div class="movie">');
			// Retrieves the Rating Data
			var rating = response.Rated;
			// Creates an element to have the rating displayed
			var pOne = $('<p>').text( "Rating: " + rating);
			// Displays the rrating
			movieDiv.append(pOne);
			// Retrieves the release year
			var released = response.Released;
			// Creates an element to hold the release year
			var pTwo = $('<p>').text( "Released: " + released);
			// Displays the release year
			movieDiv.append(pTwo);
			// Retrieves the plot
			var plot = response.Plot;
			// Creates an element to hold the plot
			var pThree = $('<p>').text( "Plot: " + plot);
			// Appends the plot
			movieDiv.append(pThree);
			// Creates an element to hold the image 
			var image = $('<img>').attr("src", response.Poster);
			// Appends the image
			movieDiv.append(image);
			// Puts the entire Movie above the previous movies.
			$('#moviesView').prepend(movieDiv);
		});
	}

	// ========================================================








	// Generic function for displaying movie data 
	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#moviesView').empty();

		// Loops through the array of movies
		for (var i = 0; i < scientists.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('movie'); // Added a class 
		    a.attr('data-name', scientists[i]); // Added a data-attribute
		    a.text(scientists[i]); // Provided the initial button text
		    $('#moviesView').append(a); // Added the button to the HTML
		}


		document.getElementById('movie-input').value = "";
	}


	// This function handles events where one button is clicked
	$('#addMovie').on('click', function(){

		// This line of code will grab the input from the textbox
		var sciPerson = $('#movie-input').val().trim();

		// The movie from the textbox is then added to our array
		scientists.push(sciPerson);
		
		// Our array then runs which handles the processing of our movie array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})


	
	// ========================================================
	// Generic function for displaying the movieInfo
	$(document).on('click', '.movie', displayMovieInfo);
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();


});