  angular
    .module('jog-it-off')
    .controller('lobbyController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;

      // var currentCount = 5;

      $scope.addGameObject = JogService.addGameObject;
      // $scope.isHost = JogService.isHost(gameID);
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);
      // $scope.countDown = JogService.countDown(currentCount);
      $scope.isReady = function () {
        console.log('isReady');
        var clientID = Meteor.userId();
        console.log("clientID: " + clientID);
        var gameObj = GameCollection.findOne({_id: gameID});
        console.log(gameObj);
        console.log("gameObj.ready.indexOf(clientID): " + gameObj.ready.indexOf(clientID));

        //add client to ready array if they don't already exist
        if( gameObj.ready.indexOf(clientID) < 0) {
          console.log('user is ready');
          GameCollection.update({_id: gameObj._id}, {$push: {ready: clientID}});
        } else {
          console.log('user is already ready');
        }

        //if all clients ready, route them
        if(players.length === ready.length) {
          //$state.go('countdown')
        }

      };
  });