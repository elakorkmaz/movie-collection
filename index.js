var express = require('express');
var pug = require('pug');
var fs = require ('fs');

var app = express();

var dataInMemory = [
{
    title: "Mistress America",
    slug: "movies/mistress-america",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzNzgzNDgzNV5BMl5BanBnXkFtZTgwODcyMjk4NTE@._V1_SY1000_SX675_AL_.jpg",
    directorName: "Noah Baumbach",
    description: "A story that follows a New York woman (who doesn't really have an apartment), apprentices for a dance company (though she's not really a dancer), and throws herself headlong into her dreams, even as their possibility dwindles.",
    releaseYear: "2015"
},
{
    title: "Eyes Wide Shut",
    slug: "movies/eyes-wide-shut",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5NTUwNjI1N15BMl5BanBnXkFtZTYwOTE1ODc5._V1_.jpg",
    directorName: "Stanley Kubrick",
    description: "A New York City doctor, who is married to an art curator, pushes himself on a harrowing and dangerous night-long odyssey of sexual and moral discovery after his wife admits that she once almost cheated on him.",
    releaseYear: "1999"
},
{
    title: "Lost in Translation",
    slug: "movies/lost-in-translation",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2NDI5ODk4N15BMl5BanBnXkFtZTYwMTI3NTE3._V1_.jpg",
    directorName: "Sofia Coppola",
    description: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
    releaseYear: "1999"
}];

function findMovie(slug) {
  for (var i = 0; i < dataInMemory.length; i++) {
    if (dataInMemory[i].slug === slug) {
      return dataInMemory[i];
    }
  }
}

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
  response.redirect('/movies');
});

app.get('/movies', function(req, res) {
  console.log('Requesting /movies');
  res.send(pug.renderFile('views/index.pug', { movies: dataInMemory }));
});

app.get('/movies/*', function(req, res) {
  var foundMovie = findMovie(req.params[0]);
  res.send(pug.renderFile('views/movie.pug', { movie: foundMovie }));
});

app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
