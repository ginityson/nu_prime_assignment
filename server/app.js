var express = require('express');
var app = express();
var path = requier('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');

mongoose.connect('localhost:/27017/chicken');

var ourScheme = new mongoose.Schema({
    assignment_number: Number,
    student_name: String,
    score: Number,
    date_completed: String
});

var ourModel = mongoose.model('ourModel', ourScheme );


//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

//spin up server
app.listen(8080, 'localhost', function(req, res){
  console.log('listen 8080');
});

//static folder
app.use(express.static('public'));
