angular
  .module('jog-it-off')
  .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

    gameID = $stateParams.gameID;
    console.log("GLOBAL inside setPoint", GLOBAL_GAME_ID);
    $scope.isHost = JogService.isHost(GLOBAL_GAME_ID);
    $scope.setPoint = JogService.setPoint;
    // $scope.plotTimer = $scope.gameObj.plotTimer;
    // var num = $scope.plotTimer;
    // $scope.hour = 0;
    // $scope.min = 0;
    // $scope.sec = 0;

    // //sets timer countdown
    // $interval(function() {
    //     num--;
    //     $scope.plotTimer = num;

    //     $scope.hour = parseInt( $scope.plotTimer / 3600 );
    //     $scope.min = parseInt( ($scope.plotTimer - ($scope.hour * 3600)) / 60 );
    //     $scope.sec = parseInt( $scope.plotTimer - ($scope.hour * 3600) - ($scope.min * 60) );

    //     if($scope.plotTimer <= 0) {
    //       $state.go('game.game_countdown');
    //     }
    // }, 1000, num);

    //set view to use gameObj
    // $scope.plotTimer = $scope.gameObj.plotTimer;
    //sets timer countdown

   // Timer
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

      if($scope.plotTimer <= 0) {
        $state.go('game.game_countdown');
      }
    });
  });