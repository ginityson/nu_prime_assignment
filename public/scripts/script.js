var myApp=angular.module( 'myApp', [] );

//controller set up for "$scope" of what will be controlled by angular in index.html
myApp.controller( 'assignmentController', [ '$scope', '$http', function( $scope, $http ){

  //'Add' button clicked now input expressions of the ng-model tags are passed into objectToSend
  $scope.addRecord = function(){
    event.preventDefault();
    var objectToSend ={
      assignment_number: $scope.assignment_number,
      student_name: $scope.student_name,
      score: $scope.score,
      date_completed: $scope.date_completed
  };//end of object objectToSend, continute to POST below

    //call to send or POST the info of objectToSend via the url route of /testPost
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
  });//end of $http call
    $scope.assignment_number ='';//clears the input
    $scope.student_name='';//clears the input
    $scope.score='';//clears the input
    $scope.date_completed='';//clears the input
};//end of addRecord function go serverside to app.js and post /testPost path

  //'get assignments' button clicked now GET method via url path of /getRecords initiated
  $scope.getRecords = function(){
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      //here the ask for info from database happens and allTheAssignments is equated to response.data on serverside
      $scope.allTheAssignments = response.data;
      console.log( 'allTheAssignments ' + $scope.allTheAssignments );
    },
    function myError( response ){
      console.log( response.statusText );
    }//end the myError
  );//close the .then
  };//end of getRecords function
}]);//end of controller
