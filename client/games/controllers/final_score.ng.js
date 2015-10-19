angular
    .module('jog-it-off')
    .controller('finalScore', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      console.log($scope.gameObj, "this is the game object");

      gameID = $stateParams.gameID;
      $scope.returnMain = returnMain;
      $scope.score = GameCollection.findOne({_id: gameID}, {fields: {score: 1}});
      console.log($scope.score.score);

      var score = GameCollection.findOne({ _id: gameID } , {fields: {score: 1}});

      $rootScope.wink = false;
      $scope.playAgain = true;

      // SORT ----------------------------------------------->
      $scope.finalScore = [];

      function sortScore (a, b) { return b[1]-a[1]; }
      function sortTime (a, b) { return a[2]-b[2]; }
      function pushFinal (e) {
        e[3] = $scope.finalScore.length + 1;
        $scope.finalScore.push(e);
      }

      $scope.score.score.sort(sortScore);

      for(var i=0; i<$scope.score.score.length;) {
        var tempArr = [];
        tempArr.push($scope.score.score[i]);

        for(var k=1; k<$scope.score.score.length; k++) {
         if ($scope.score.score[i][1] === $scope.score.score[k][1]) {
           tempArr.push($scope.score.score[k]);
           $scope.score.score.splice(k, 1);
           k--;
         }
        }
        $scope.score.score.splice(i, 1);

        tempArr.sort(sortTime);
        tempArr.forEach(pushFinal);

      }

      console.log($scope.finalScore);

      $scope.winner = $scope.finalScore[0];
      $scope.loser = $scope.finalScore[$scope.finalScore.length -1];

    //REMOVE gameObject -----------------------------------------------

    var removeTime = 0;

    $interval(function(){
      removeTime++;
      if (removeTime === 3) {
       GameCollection.remove({_id: gameID});
      }
     }, 1000);


    // PLAY AGAIN -----------------------------------------------------
      function returnMain () {
        console.log('return me to main page');
        $state.go('main');
      }

});





