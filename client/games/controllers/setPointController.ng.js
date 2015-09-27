 angular
    .module('jog-it-off')
    .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {


      $scope.isHost = JogService.isHost($scope.gameID);
      $scope.pointNum = $scope.gameObj.pointNum;
      $scope.setPoint = JogService.setPoint;

      Meteor.users.update({_id: clientID}, {$set: {"profile.pointNum": $scope.pointNum}});

      $interval(function() {
        $scope.hour = parseInt( $scope.gameObj.plotTimer / 3600 );
        $scope.min = parseInt( ($scope.gameObj.plotTimer - ($scope.hour * 3600)) / 60 );
        $scope.sec = parseInt( $scope.gameObj.plotTimer - ($scope.hour * 3600) - ($scope.min * 60) );

        if($scope.isHost) {
        GameCollection.update({_id: $scope.gameID}, {$inc: {plotTimer: -1} });
        }


      }, 1000, $scope.plotTimer);

     $scope.$watch('gameObj.plotTimer', function() {
        console.log("watch plotTimer:" + $scope.gameObj.plotTimer);

        if($scope.gameObj.plotTimer <= 0) {
          $state.go('game.game_countdown');
        }
      });
    });