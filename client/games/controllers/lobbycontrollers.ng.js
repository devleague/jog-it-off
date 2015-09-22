  angular
    .module('jog-it-off')
    .controller('lobbyController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;
      var allReady = false;

      function readyGo() {
        if (allReady === true) {
          $state.go('countdown');
        }
      }

      // var currentCount = 5;
      // $scope.isHost = JogService.isHost(gameID);
      // $scope.countDown = JogService.countDown(currentCount);
      $scope.addGameObject = JogService.addGameObject;
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);

      $scope.isReady = function () {
        var clientID = Meteor.userId();
        var gameObj = GameCollection.findOne({_id: gameID});

        //add client to ready array if they don't already exist
        if( gameObj.ready.indexOf(clientID) < 0) {
          console.log('user is ready');
          GameCollection.update({_id: gameObj._id}, {$push: {ready: clientID}});
        } else {
          console.log('user is already ready');
        }

        //if all clients ready, route them
        if(players.length === ready.length) {
          allReady = true;
        }

      };
  });