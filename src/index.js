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
    $('#loading').html(`<div class="spinner"></div>`);
    getMovies().then((movies) => {
        $('#loading').html(`<h3 id=loading>Here are all the movies:</h3>`);
        movies.forEach(({title, rating, id, genre}) => {
            $('#loading').append(`<ul>
<li>${title} - rating: ${rating} - genre: ${genre}</li>
<button type="submit" value=${id} class="del">Delete</button>
</ul>`)
        })
    }).then(() => {
        buildDropDown();
        addGenre();
    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
});
const buildDropDown = (() => {
    $('#movieSelect').empty();
    getMovies().then((movies) => {
        movies.forEach(({title, rating, id, genre}) => {
            $('#movieSelect').append(`<option value="${title}:${id}:${rating}:${genre}">${title} ${rating}</option>`)
        })
    })
});
$('#edit').click(function() {
    let movieToEdit = $('#movieSelect').val();
    console.log(movieToEdit);
    let movieArray = movieToEdit.split(":");
    console.log(movieArray)
    // let ratingToEdit = movieToEdit.substring(movieToEdit.length - 1, movieToEdit.length);
    // movieToEdit = movieToEdit.substring(0, movieToEdit.length - 2);
    //
    //
    // console.log(movieToEdit);
    // console.log(ratingToEdit);
    $('#editForm').toggleClass("visible");
    document.getElementById("newMovieTitle").value = movieArray[0];
    // $('#newMovieTitle').replaceWith(`<input type="text" id="newMovieTitle" name="newMovieTitle" value=${movieToEdit}>`);
    $('#newRating').replaceWith(`<input type="text" id="newRating" name="newRating" value=${movieArray[2]}>`);
    $('#movieId').replaceWith(`<input type="text" id="movieId" name="movieId" value=${movieArray[1]} class="hiddenId">`)
    $('#newGenre').replaceWith(`<input type="text" id="newGenre" name="newGenre" value=${movieArray[3]}>`)
});

$('#subBttn').click(function () {
    let movieTitle = $('#movieTitle').val();
    let rating = $("#rating").val();
    let genre = $('#genre').val();
    const movie = {
        "title": movieTitle,
        "rating": rating,
        "genre": genre
    };
    $.post('/api/movies', movie);
    updateMovies();
    clearMovieInfo();
});
updateMovies();

const clearMovieInfo = (()=>{
    document.getElementById("movieTitle").value = "";
    document.getElementById("rating").value = "";
});

$('#submitEdit').click(function (e) {
    e.preventDefault();
    $('#editForm').toggleClass("visible");
    let movieTitle = $('#newMovieTitle').val();
    let rating = $("#newRating").val();
    let id = $('#movieId').val();
    let genre = $('#newGenre').val();
    console.log(id);
    const movie = {
        "title": movieTitle,
        "rating": rating,
        "genre": genre
    };
    $.ajax(`/api/movies/${id}`, {
        method: 'PATCH',
        data: JSON.stringify(movie),
        contentType: 'application/json'
    });
    updateMovies();
});
const addGenre = (()=> {
    const movie = {
        "genre": "to be defined"
    };
    getMovies().then((movies)=>{
        movies.forEach((title, index)=>{
            $.ajax(`/api/movies/${title[index]}`, {
                method: 'PATCH',
                data: JSON.stringify(movie),
                contentType: 'application/json'
            });
        });
    });


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

