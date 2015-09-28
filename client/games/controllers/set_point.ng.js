angular
  .module('jog-it-off')
  .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

    var clientID = Meteor.userId();
    gameID = $stateParams.gameID;
    $scope.isSetPoint = true;
    $scope.isHost = JogService.isHost($scope.gameID);
    $scope.setPoint = JogService.setPoint;
    $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
    console.log($scope.gameObj.pointNum);

    Meteor.users.update({_id: clientID}, {$set: {"profile.pointNum": $scope.gameObj.pointNum}});

    $scope.plotTimer = $scope.gameObj.plotTimer;
    var num = $scope.plotTimer;
    $scope.hour = 0;
    $scope.min = 0;
    $scope.sec = 0;

    $interval(function() {
      $scope.hour = parseInt( $scope.gameObj.plotTimer / 3600 );
      $scope.min = parseInt( ($scope.gameObj.plotTimer - ($scope.hour * 3600)) / 60 );
      $scope.sec = parseInt( $scope.gameObj.plotTimer - ($scope.hour * 3600) - ($scope.min * 60) );

      if($scope.isHost) {
      GameCollection.update({_id: $scope.gameID}, {$inc: {plotTimer: -1} });
      }

      if($scope.gameObj.plotTimer <= 0) {
        $state.go('game.game_countdown');
      }

    }, 1000, $scope.plotTimer + 1);

     // $scope.$watch('gameObj.plotTimer', function() {
     //    if($scope.gameObj.plotTimer <= 0) {
     //      $state.go('game.game_countdown');
     //    }

  });