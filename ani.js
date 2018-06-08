$(document).ready(function() {// Array of animals

    var animals=["pig", "sheep","snake", "goat", "duck", "fish", "snail", "Bear", "Monkey", "peacock",
    "cow", "dog", "cat", "turtle", "dolphin","panda", "bird", "snowcrab", "lizard", "beetle", "frog", "fish", "ostrich", "guineafowl",
    "koala", "shark", "tiger", "kangaroo", "porcupine"
    ];

    // function to make buttons and add to page
    function populateButtons(arrToUse,addClass, addToArea) {
        $(addToArea).empty();

        for (var i = 0; i < arrToUse.length; i++) {
            var k = $("<button>");
            k.addClass(addClass);
            k.attr("data-type", arrToUse[i]);
            k.text(arrToUse[i]);
            $(addToarea).append(i);
        }
    }
  $(document).on("click", ".animal-button", function(){
      $("#animals").empty();
      $(".animal-button").removeClass("active");
      $(this).addClass("active");

      var type = $(this).attr("data-type");
     
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "api_key=KEhr665qWCHF8BoifwYd20uE0t5DF6qz&q=animals&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
      })
          .then(function(response){
              var results = response.data; 

              for(var i =0; i< results.length; i++) {
                  var animalDiv = $("div class=\"animal-item\">");

                  var rating = results[i].rating;
                  var p = $("<p>").text("Rating: " + rating);

                  var animated = results[i].image.fixed_height.url;
                  var still = results[i].image.fixed_height_still.url;

                  var animalImage = $("<img>");
                  animalImage.attr("src", still);
                  animalImage.attr("data-still", still);
                  animalImage.attr("data-animate", animated);
                  animalImage.attr("data-state", "still");
                  animalImage.addClass("animal-image");

                  animalDiv.append(p);
                  animalDiv.append(animalImage);
                  $("#animals").append(animalDiv);

                  $(document).on("click", ".animal-image", function(){
                      var state = $(this).attr("data-state");

                      if(state === "still"){
                          $(this).attr("src", $(this).attr("data-animate"));
                          $(this).attr("data-state", "animate");
                      }
                      else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");

                        $("#add-animal").on("click", function(event) {
                            event.preventDefault();
                            var newAnimal = $("input").eq(0).val();

                            if(newAnimal.length > 2) {
                                animals.push(newAnimal);
                            }
                            populateButtons(animals, "animal-button", "#animal-buttons");
                   } 
                )};
             populateButtons(animals, "animal-button", "#animal-buttons");
        } 
        )};
    })
});
  });

                     
