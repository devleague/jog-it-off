  angular
    .module('jog-it-off')
    .controller('lobbyController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {


      var clientID = Meteor.userId();
      var gameID = $stateParams.gameID;
      Meteor.users.update({_id: clientID}, {$set: {"profile.gameID": gameID}});


      $scope.isHost = JogService.isHost(gameID);
      $scope.addGameObject = JogService.addGameObject;
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      // $scope.gameObj = GameCollection.findOne({_id: gameID});

      // $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);
      // $scope.startGame = JogService.startGame;
      $scope.startGame = function () {
        console.log('allReady set to true');
        GameCollection.update({_id: gameID}, {$set: {allReady: true}});
        console.log("$scope.allReady: " + $scope.allReady);
        // state.go('game.plot_countdown');
      };

      // if($scope.allReady === true) {
      //   console.log('allReady leads you to plot countdown');
      //   $state.go('game.plot_countdown');
      // }

      // console.log("allReady:" + $scope.allReady);

      $scope.$watch('gameObj', function() {
        console.log("watch allReady:" + $scope.gameObj.allReady);
        if($scope.gameObj.allReady){
          $state.go('game.plot_countdown');
        }
      });
  });