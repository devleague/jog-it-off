(function() {
  angular
    .module('jog-it-off')
    .service('JogService', ['$state', '$meteor',function ($state, $meteor) {
      // debugger;


      this.addGameObject = function(roomName, pointNum, plotTime, gameTime, $scope) {
        var client = Meteor.user();
        var clientID = Meteor.userId();
        var host = client.username;
        var plotTimer = plotTime * 60;
        var gameTimer = gameTime * 60;

        var gameObject = {
          host: host,
          room: roomName,
          pointNum: pointNum,
          plotTime: plotTime,
          gameTime: gameTime,
          timestamp: new Date().toString(),
          plotTimer: plotTimer,
          gameTimer: gameTimer,
          players: [client],
          allReady: false,
          markers:[],
          coins:[]
        };


        GameCollection.insert(gameObject, function(error, gameID) {
          // console.log(error, gameID);
          $state.go('game.lobby', {'gameID': gameID});
        });

      };

      this.joinGame = function ($scope, $meteor) {
        var client = Meteor.user();
        var clientID = Meteor.userId();
        var gameID = this.game._id;
        var gameObj = GameCollection.findOne({_id: gameID});
        var players = gameObj.players;

        //find out if client is existing in players array
        var missing = true;
        for(var i=0; i < players.length; i++) {
            if(players[i]._id === clientID) {
               missing = false;
               console.log("missing set to false");
               break;
           }
        }
        //if missing, add client to players array
        if(missing) {
          console.log('player is missing. added to game');
          GameCollection.update({_id: this.game._id}, {$push: {players: client}});
        }
      };

      this.isHost = function (gameID) {
        clientID = Meteor.userId();
        var gameObj = GameCollection.findOne({_id: gameID});
        var objPlayers = gameObj.players;
        var host = gameObj.host;
        var hostID = null;

        //set host ID
        for(var i=0; i<objPlayers.length; i++) {
          if(objPlayers[i].username === host) {
            hostID = objPlayers[i]._id;
          }
        }

        //validate client is host
        if (clientID === hostID) {
          return true;
        } else {
          return false;
        }
      };

      // this.startGame = function ($scope) {
      //   console.log('allReady set to true');
      //   console.log("$scope.allReady: " + $scope.allReady);
      //   $scope.allReady = true;
      //   // state.go('game.plot_countdown');
      // };

      this.roomPlayers = function (gameID){
        var obj = GameCollection.findOne({_id: gameID});
        return obj.players;
      };

      this.getGames = function () {
      };

      this.setPoint = function () {

      };


    }]);
})();

