angular
    .module('jog-it-off')
    .controller('gameSession', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

      var clientID = Meteor.userId();
      gameID = $stateParams.gameID;
      $scope.isHost = JogService.isHost($scope.gameID);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.pickUpMarker = pickUpMarker;



      $scope.gameTimer = $scope.gameObj.gameTimer;
      var num = $scope.gameTimer;
      $scope.hour = 0;
      $scope.min = 0;
      $scope.sec = 0;

      $interval(function() {
        $scope.hour = parseInt( $scope.gameObj.gameTimer / 3600 );
        $scope.min = parseInt( ($scope.gameObj.gameTimer - ($scope.hour * 3600)) / 60 );
        $scope.sec = parseInt( $scope.gameObj.gameTimer - ($scope.hour * 3600) - ($scope.min * 60) );

        if($scope.isHost) {
        GameCollection.update({_id: $scope.gameID}, {$inc: {gameTimer: -1} });
        }

        if($scope.gameObj.gameTimer <= 0) {
          $state.go('game.final');
        }

      }, 1000, $scope.plotTimer + 1);

      function pickUpMarker () {
        alert("picking up marker");
      }
    });