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
const updateMovies = (()=>{
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


});

$('#subBttn').click(function(){
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