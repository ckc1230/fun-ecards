/* MODULE IMPORTS */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


/* DATABASE */

var db = require('./models');

/* HTML ROUTES */ 

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/* API ROUTES */ 

app.get('/api/ecards', function indexECards(req, res) {
  db.ECard.find({}, function(err, allECards) {
    if (err) { throw err; };
    res.json(allECards);
  });
});

app.post('/api/ecards', function createECard(req, res) {
  console.log(req.body);
  db.ECard.create(req.body, function(err, ecard) {
    if (err) { throw err; };
    res.json(ecard);
  });
});

app.get('/api/themes', function indexThemes(req, res) {
  db.Theme.find({}, function(err, allThemes) {
    if (err) { throw err; };
    res.json(allThemes);
  });
});

app.get('/api/questions', function indexQuestions(req, res) {
  db.Question.find({}, function(err, allQuestions) {
    if (err) { throw err; };
    res.json(allQuestions);
  });
});

/* SERVER SET UP */ 

app.listen(process.env.PORT || 3000, function() {
  console.log('Your server is running on port 3000');
});