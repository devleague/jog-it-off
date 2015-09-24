  angular
    .module('jog-it-off')
    .controller('joinController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.joinGame = JogService.joinGame;

  });
