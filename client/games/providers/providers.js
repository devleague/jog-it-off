(function() {
  angular
    .module('jog-it-off')
    .service('JogService', ['$state', '$meteor', function ($state, $meteor) {
      // debugger;

      this.addGameObject = function(roomName, pointNum, plotTime, gameTime, $scope) {
        var client = Meteor.user();
        var host = client.username;
        var plotTimer = plotTime * 60;
        var gameTimer = gameTime * 60;

        var gameObject = {
          host: host,
          room: roomName,
          pointNum: pointNum,
          plotTime: plotTime,
          gameTime: gameTime,
          timestamp: new Date(),
          plotTimer: plotTimer,
          gameTimer: gameTimer,
          players: [client],
          ready: [],
          allReady: false,
          markers:[]
        };

        GameCollection.insert(gameObject, function(error, gameID) {
          // console.log(error, gameID);
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
        var missing = false;
        for(var i=0; i < players.length; i++) {
          if(players[i]._id !== clientID) {
            missing = true;
          }
        }

        //if missing, add client to players array
        if(missing) {
          GameCollection.update({_id: this.game._id}, {$push: {players: client}});
        }

        Meteor.users.update({_id: clientID}, {$set: {"profile.game": gameObj}});

      };

      this.isHost = function (gameID, $scope) {
        clientID = Meteor.userId();
        var obj = GameCollection.findOne({_id: gameID});
        var objPlayers = obj.players;
        var host = obj.host;
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

