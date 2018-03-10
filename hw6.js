var gifs = ['fun', 'happy', 'sad'];

//renders a button for each item in the gifs array
function renderButtons() {

    $('#emotionButtons').empty();

    for (let i = 0; i < gifs.length; i++) {
        var a = $('<button>');
        a.addClass('btns');
        a.attr('data-name', gifs[i]);
        a.text(gifs[i]);
        $('#emotionButtons').append(a);
    }
}

$('#addEmotion').on('click', function(event) {
    event.preventDefault();

    var newInput = $('#emotionInput').val();
    gifs.push(newInput);

    renderButtons();
})

renderButtons();

function displayGifs() {

    var gif = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&rating=pg&api_key=d1OzuxDklgkWv3imE7a8T2qnDmuaiEO5&limit=10';

    $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .then(function(response) {

            var results = response.data;
           
            for (let i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='gif'>");

                var rating = results[i].rating;
                var p = $('<p>').text("rating: " + rating);

                var newGif = $('<img>');
                newGif.attr('src', results[i].images.fixed_height_small_still.url);
                newGif.attr('data-state', 'still');
                newGif.attr('data-still', results[i].images.fixed_height_small_still.url)
                newGif.attr('data-animate', results[i].images.fixed_height_small.url)

                gifDiv.append(newGif);
                gifDiv.append(p);

                $('#emotion').prepend(gifDiv);

            }
        })
}

function changeGif() {

var state = $(this).attr('data-state');
console.log(state);

if(state === 'still') {
	$(this).attr("src", $(this).attr("data-animate"));
	$(this).attr('data-state', 'animate');
} else {
	$(this).attr('src', $(this).attr('data-still'));
	$(this).attr('data-state', 'still');
}

}

$(document).on('click', 'img', changeGif)
$(document).on('click', '.btns', displayGifs);