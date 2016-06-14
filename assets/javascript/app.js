$(document).ready(function() {
    
    // Initial array of favoritesArray
    //The array will be sorted later in the program
    var favoritesArray = ["dogs", 'zebras', 'cats', 'fish', 'tesla',
        'automobiles'
    ];
    
    
    $(document).on('click', '#favHdr', function() {
        var state = $(this).attr('data-state');
        if (state == 'image1') {
            $('body').css('background-image',
                'url(assets/images/poolwater.jpg)');
            $(this).attr('data-state', 'image2');
        } else {
            $('body').css('background-image',
                'url(assets/images/grasspole.jpg)');
            $(this).attr('data-state', 'image1');
        }
        $('body').css('background-repeat', 'repeat');
        $('body').css('background-size', '1608px 775px');
    });
    
    
    $(document).on('click', '.imageClass', function() {
        //alert("an image has been clicked!");
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    
    
    // ========================================================
    // displayFavoriteInfo function now re-renders the HTML to display the appropriate content. 
    function displayFavoriteInfo() {
            var favorite = $(this).attr('data-name');
            //alert("favorite=" + favorite);
            //   this is the query statement
            var queryURL =
                "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" +
                "\"" + favorite + "\"";
            //alert(queryURL);
            //  issue get to this url
            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                // 
                .done(function(response) {
                    //console.log("response.data=" + response.data)
                    //console.log(response);
                    // 
                    var imageUrl = response.data.image_original_url;
                    var imageUrlStill = response.data.fixed_height_small_still_url;
                    // 
                    var gifImage = $("<img>");
                    // 
                    gifImage.attr('src', imageUrl);
                    gifImage.attr('data-animate', imageUrl);
                    gifImage.attr('data-still', imageUrlStill);
                    gifImage.attr('data-state', 'animate');
                    gifImage.attr('class', 'imageClass');
                    gifImage.attr('alt', 'cat image');
                    //
                    $('.favImagesDiv').prepend(gifImage);
                });
        }
        
        
        // ========================================================
        // Generic function for displaying favorite data 

    function renderButtons() {
            // Deletes the favoritesArray prior to adding new favoritesArray (this is necessary otherwise you will have repeat buttons)
            $('#buttonsView').empty();
            // Loops through the array of favoritesArray
            favoritesArray.sort();
            for (var i = 0; i < favoritesArray.length; i++) {
                // Then dynamicaly generates buttons for each favorite in the array
                // Note the jQUery syntax here... 
                var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
                a.addClass('favorite'); // Added a class 
                a.attr('data-name', favoritesArray[i]); // Added a data-attribute
                a.text(favoritesArray[i]); // Provided the initial button text
                $('#buttonsView').append(a); // Added the button to the HTML
            }
        }
        
        
    // ========================================================
    // This function handles events where one button is clicked
    $('#addFavBtn').on('click', function() {
            // This line of code will grab the input from the textbox
            var favorite = $('#favorite-input').val().trim();
            // The favorite from the textbox is then added to our array
            if (favorite != "") {
                favoritesArray.push(favorite);
                $('#favorite-input').val('');
            }
            // Our array then runs which handles the processing of our favorite array
            renderButtons();
            // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
            return false;
        })
        
        
    // This function handles events where one button is clicked
    $('#clearFavBtn').on('click', function() {
            var favorite = $('#favorite-input').val().trim();
            //alert("favorite=" + favorite);
            favoritesArray.length = 0;
            if (favorite != "") {
                $('#favHdr').html(favorite);
                $('#favorite-input').val('');
            }
            // Our array then runs which handles the processing of our favorite array
            renderButtons();
            // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
            return false;
        })
        
        
    // This function handles events where one button is clicked
    $('#clearImgBtn').on('click', function() {
            $('.favImagesDiv').empty();
            // Our array then runs which handles the processing of our movie array
            renderButtons();
            // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
            return false;
        })
        
        
    // ========================================================
    // Generic function for displaying the favoriteInfo
    $(document).on('click', '.favorite', displayFavoriteInfo);
    // ========================================================
    
    
    // This calls the renderButtons() function
    renderButtons();
});