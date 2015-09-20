  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$state', '$meteor', '$rootScope', 'JogService', function ($scope, $state, $meteor, rootScope, JogService) {

      var currentCount = 5;

      $scope.addGameObject = JogService.addGameObject;
      $scope.isHost = JogService.isHost();
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.countDown = JogService.countDown(currentCount);
  }]);


