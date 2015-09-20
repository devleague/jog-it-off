  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$state', '$meteor', '$rootScope', 'JogService', '$stateParams',  function ($scope, $state, $meteor, rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;

      var currentCount = 5;

      $scope.addGameObject = JogService.addGameObject;
      $scope.isHost = JogService.isHost();
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);
      $scope.countDown = JogService.countDown(currentCount);
  }]);