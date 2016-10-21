var express = require('express');
var pug = require('pug');
var fs = require ('fs');

var app = express();

var dataInMemory = JSON.parse(fs.readFileSync('data.json').toString())['movies'];

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
