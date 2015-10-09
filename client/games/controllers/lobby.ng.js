  angular
    .module('jog-it-off')
    .controller('lobbyController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var clientID = Meteor.userId();
      var gameID = $stateParams.gameID;
      $scope.isHost = JogService.isHost(gameID);
      $scope.addGameObject = JogService.addGameObject;
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.allReady = $scope.gameObj.allReady;
      $scope.roomPlayers = JogService.roomPlayers(gameID);

      Meteor.users.update(
        {_id: clientID},
        {
          $set: {"profile.gameID": gameID, "profile.coins": 0}
        }
      );

      $scope.startGame = function () {
        GameCollection.update({_id: gameID}, {$set: {allReady: true, hasStarted: true}});
      };

      $scope.$watch('gameObj.allReady', function() {
        if($scope.gameObj.allReady){
          $state.go('game.plot_countdown');
        }
      });
  });