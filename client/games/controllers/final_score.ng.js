angular
    .module('jog-it-off')
    .controller('finalScore', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      console.log($scope.gameObj, "this is the game object");

      gameID = $stateParams.gameID;

      $scope.returnMain = returnMain;

      var clientScore = [ Meteor.user().username, Meteor.user().profile.coins.length, Meteor.user().profile.finish];
      GameCollection.update({_id: gameID}, {$push: { score: clientScore }});

      $scope.score = GameCollection.findOne({_id: gameID}, {fields: {score: 1}});

      var score = GameCollection.findOne({ _id: gameID } , {fields: {score: 1}});

      $scope.winner = $scope.score.score[0];

      $scope.loser = $scope.score.score[$scope.score.score.length -1];

      // SORT ----------------------------------------------->

      $scope.finalScore = [];

      function sortScore (a, b) { return b[1]-a[1]; }
      function sortTime (a, b) { return a[2]-b[2]; }
      function pushFinal (e) {
        e[3] = $scope.finalScore.length + 1;
        $scope.finalScore.push(e);

      }

      score.score.sort(sortScore);

      for(var i=0; i<score.score.length;) {
        var tempArr = [];
        tempArr.push(score.score[i]);

        for(var k=1; k<score.score.length; k++) {
         if (score.score[i][1] === score.score[k][1]) {
           tempArr.push(score.score[k]);
           score.score.splice(k, 1);
           k--;
         }
        }
        score.score.splice(i, 1);

        tempArr.sort(sortTime);
        tempArr.forEach(pushFinal);

      }

      console.log($scope.finalScore);

      // -------------------------------------------------------

            function returnMain () {
              console.log('return me to main page');
              $state.go('main');
            }

});





