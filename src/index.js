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

getMovies().then((movies) => {
  $('#loading').html(`<p id=loading>Here are all the movies:</p>`);
  movies.forEach(({title, rating, id}) => {
    $('#loading').append(`<ul>
<li>id#${id} - ${title} - rating: ${rating}</li>
</ul>`)
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$('#subBttn').click(function(){
  let movieTitle = $('#movieTitle').val();
  let rating = $("#rating").val();
 const movie = {
   "title": movieTitle,
    "rating": rating
  };
 const url = '/api/movies';
  const newMovie = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
  };
  console.log(movie);
  fetch(url,movie)
      .then(console.log("done"))
      .catch(console.log("error"))
});
