  angular
    .module('jog-it-off')
    .controller('lobbyController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

<<<<<<< HEAD
      var clientID = Meteor.userId();
      var gameID = $stateParams.gameID;
      Meteor.users.update({_id: clientID}, {$set: {"profile.gameID": gameID}});


      $scope.isHost = JogService.isHost(gameID);
      $scope.addGameObject = JogService.addGameObject;
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.gameObj = GameCollection.findOne({_id: gameID});

       $scope.gameObject = $meteor.object(GameCollection, gameID);

      $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);
      $scope.startGame = JogService.startGame;
      $scope.allReady = GameCollection
                          .findOne({_id: gameID})
                          .allReady;

      // console.log("allReady:" + $scope.allReady);

      // $scope.$watch('allReady', function() {
      //   console.log("watch allReady:" + $scope.allReady);
      //   $state.go('countdown');
      // });

=======
      var gameID = $stateParams.gameID;
      var allReady = false;

      function readyGo() {
        if (allReady === true) {
          $state.go('countdown');
        }
      }

      // var currentCount = 5;
      $scope.isHost = JogService.isHost(gameID);
      // $scope.countDown = JogService.countDown(currentCount);
      $scope.addGameObject = JogService.addGameObject;
      $scope.games = JogService.getGames();
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.roomName = JogService.roomName(gameID);
      $scope.roomPlayers = JogService.roomPlayers(gameID);
>>>>>>> origin/watch-reroute

      // $scope.isReady = function () {
      //   var clientID = Meteor.userId();
      //   var gameObj = GameCollection.findOne({_id: gameID});

      //   //add client to ready array if they don't already exist
      //   if(gameObj.ready.indexOf(clientID) < 0) {
      //     console.log('user is ready');
      //     GameCollection.update({_id: gameObj._id}, {$push: {ready: clientID}});
      //   } else {
      //     console.log('user is already ready');
      //   }

      //   //if all clients ready, route them
      //   if(players.length === ready.length) {
      //     allReady = true;
      //   }
      // };
  });