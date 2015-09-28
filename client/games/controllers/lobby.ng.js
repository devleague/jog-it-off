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
        console.log('allReady set to true');
        GameCollection.update({_id: gameID}, {$set: {allReady: true}});
        console.log("$scope.allReady: " + $scope.allReady);
      };

      $scope.$watch('gameObj.allReady', function() {
        console.log("$scope.gameObj:", $scope.gameObj);
        console.log("watch allReady:" + $scope.gameObj.allReady);
        if($scope.gameObj.allReady){
          $state.go('game.plot_countdown');
        }
      });
  });