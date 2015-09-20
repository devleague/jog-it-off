  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$state', '$meteor', '$rootScope', 'JogService', '$stateParams',  function ($scope, $state, $meteor, rootScope, JogService, $stateParams) {

      $scope.addGameObject = JogService.addGameObject;
      $scope.isHost = JogService.isHost();
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.roomName = JogService.roomName(gameID);

      var gameID = $stateParams.gameID;
      // console.log(gameID);

  }]);


