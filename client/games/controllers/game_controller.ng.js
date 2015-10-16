 angular
    .module('jog-it-off')
    .controller('gameController', function (gameID, $scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      gameID = $stateParams.gameID;
      $scope.gameID = gameID;
      $scope.gameCollection = $meteor.collection(GameCollection);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.allReady = $scope.gameObj.allReady;
      $rootScope.wink = false;

  });