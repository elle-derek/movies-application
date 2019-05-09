/**
 * es6 modules and imports
 */
// import sayHello from './hello';
// sayHello('World');

/**
 * require style imports
 */
const $ = require('jQuery');
const {getMovies} = require('./api.js');
const updateMovies = (() => {
    $('#loading').html(`<div class="spinner"></div>`)
    getMovies().then((movies) => {
        $('#loading').html(`<p id=loading>Here are all the movies:</p>`);
        movies.forEach(({title, rating, id}) => {
            $('#loading').append(`<ul>
<li>id#${id} - ${title} - rating: ${rating}</li>
<button type="submit" value=${id} class="del">Delete</button>
</ul>`)
        })
    }).then(() => {
        buildDropDown();
    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
});
const buildDropDown = (() => {
    $('#movieSelect').empty();
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id}) => {
            $('#movieSelect').append(`<option value="${title}${id}${rating}">${title} ${rating}</option>`)
        })
    })
});
$('#edit').click(function() {
    let movieToEdit = $('#movieSelect').val();
    console.log(movieToEdit)
    let ratingToEdit = movieToEdit.substring(movieToEdit.length - 1, movieToEdit.length);
    movieToEdit = movieToEdit.substring(0, movieToEdit.length - 2);


    console.log(movieToEdit);
    console.log(ratingToEdit);
    $('#editForm').toggleClass("visible");
    document.getElementById("newMovieTitle").value = movieToEdit;
    // $('#newMovieTitle').replaceWith(`<input type="text" id="newMovieTitle" name="newMovieTitle" value=${movieToEdit}>`);
    $('#newRating').replaceWith(`<input type="text" id="newRating" name="newRating" value=${ratingToEdit}>`)
});

$('#subBttn').click(function () {
    let movieTitle = $('#movieTitle').val();
    let rating = $("#rating").val();
    const movie = {
        "title": movieTitle,
        "rating": rating
    };
    $.post('/api/movies', movie);
    updateMovies();
});
updateMovies();

$('#submitEdit').click(function (e) {
    e.preventDefault();
    let movieTitle = $('#newMovieTitle').val();
    let rating = $("#newRating").val();
    let id = $('#movieSelect').val();
    id = id.substring(id.length - 2, id.length - 1);
    console.log(id);
    const movie = {
        "title": movieTitle,
        "rating": rating
    };
    $.ajax(`/api/movies/${id}`, {
        method: 'PATCH',
        data: JSON.stringify(movie),
        contentType: 'application/json'
    });
    updateMovies();
});


$(document).on('click', '.del', function (e) {
    // e.preventDefault();
    let id = $(this).val();
    console.log(id);
    $.ajax(`/api/movies/${id}`, {
        method: 'DELETE',
        contentType: 'application/json'
    });
    updateMovies();
});

