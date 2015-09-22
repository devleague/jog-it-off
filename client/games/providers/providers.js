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
        var gameObj = GameCollection.findOne({_id: gameID});

        if(gameObj.players.indexOf(client) < 0) {
          GameCollection.update({_id: this.game._id}, {$push: {players: client}});
        }

      };

      // this.isHost = function (gameID, $scope) {
      //   clientID = Meteor.userId();
      //   var obj = GameCollection.findOne({_id: gameID});
      //   var objPlayers = obj.players;
      //   var host = obj.host;
      //   var hostID = null;

      //   //set host ID
      //   for(var i=0; i<objPlayers.length; i++) {
      //     if(objPlayers[i].username === host) {
      //       hostID = objPlayers[i]._id;
      //     }
      //   }

      //   //validate client is host
      //   if (clientID === hostID) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // };

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

      this.countDown = function () {
        var currentCount = 5;

        var intervalTimer = function () {
          currentCount--;
          console.log(currentCount);
          if(currentCount <= 0) {
            clearInterval(duration);
            $state.go('set_point');
          }
        };
        var duration = setInterval(intervalTimer, 1000);
      };
    }]);
})();

