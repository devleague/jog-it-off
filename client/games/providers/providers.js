(function() {
  angular
    .module('jog-it-off')
    .service('JogService', ['$state', '$meteor', function ($state, $meteor) {
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
          markers:[]
        };


        GameCollection.insert(gameObject, function(error, gameID) {
          $state.go('lobby', {'gameID': gameID});
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
            console.log(console.log( "LOOP: " + players[i] + client));
            if(JSON.stringify(players[i]) === JSON.stringify(client)) {
              console.log( players[i], client);
               missing = false;
              break;
           }
        }
        //if missing, add client to players array
        if(missing) {
          GameCollection.update({_id: this.game._id}, {$push: {players: client}});
        }

      };

      this.isHost = function (gameID, $scope) {
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

      this.startGame = function () {
        //change allReady to true
      };

      this.roomName = function (gameID, $scope){

        var obj = GameCollection.findOne({_id: gameID});
        return obj.room;
      };

      this.roomPlayers = function (gameID, $scope){
        var obj = GameCollection.findOne({_id: gameID});
        return obj.players;
      };

      this.getGames = function () {
      };


    }]);
})();

