var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/chicken');

//does this recieve objectToSend values? and pass into ourScheme
var ourScheme = new mongoose.Schema({
    assignment_number: Number,
    student_name: String,
    score: Number,
    date_completed: String
});

//here ourScheme values pass into ourModel as paramaters of the mongoose model method
var ourModel = mongoose.model('ourModel', ourScheme );


//base url
app.get('/', function(req, res) {
  res.sendFile(path.resolve('views/index.html'));
  console.log('base url');
});

// get call comming through clientside script.js $http GET /getRecords
//saying .find all the info stored in the db .then grab it(data) and .send it(data) to clientside script.js
// as response carying the data to "allTheAssignments" which then goes to index.html ng-repeat "allTheAssignments"
app.get( '/getRecords', function( req, res ){
  ourModel.find()
  .then( function( data ){
    res.send( data );
  });
});

//spin up server
app.listen(8080, 'localhost', function(req, res){
  console.log('listen 8080');
});
// post call comming from script.js $http post call conveying objectToSend data known here as req.body....
app.post( '/testPost', function( req, res ){
  console.log( 'req.body: ' + req.body.student_name );
  // retrieved the req.body

  // putting req.body.... into an object to be saved in the db
  var recordToAdd={
    assignment_number: req.body.assignment_number,
    student_name: req.body.student_name,
    score: req.body.score,
    date_completed: req.body.date_completed

  };
  // MAGIC newRecord is really the mongoose.model method with parameter of recordToAdd
  var newRecord=ourModel( recordToAdd );
  //here newRecord is saved presumably to the container ? in the database chicken
  newRecord.save();
});
//static folder makes 'sourcing' files easy by making them all be on the same level of public
app.use(express.static('public'));
