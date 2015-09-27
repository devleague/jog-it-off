 angular
    .module('jog-it-off')
    .controller('gameController', function (gameID, $scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      gameID = $stateParams.gameID;
      $scope.gameID = gameID;
      $scope.gameCollection = $meteor.collection(GameCollection);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      console.log("$scope.gameObj:" + $scope.gameObj);
      $scope.allReady = $scope.gameObj.allReady;
  });