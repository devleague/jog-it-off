angular
    .module('jog-it-off')
    .controller('finalScore', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      console.log($scope.gameObj);

      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      gameID = $stateParams.gameID;

      GameCollection.update({_id: gameID}, {$inc: {plotTimer: -1} });
      $scope.returnMain = returnMain;

      var clientScore =


      function returnMain () {
        console.log('return me to main page');
        $state.go('main');
      }


});





