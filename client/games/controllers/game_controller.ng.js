 angular
    .module('jog-it-off')
    .controller('gameController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.gameID = $stateParams.gameID;
      $scope.gameCollection = $meteor.collection(GameCollection);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID);
      // $scope.game = {
      //   name: "billy"
      // };
  });