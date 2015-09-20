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
          markers:[]
        };

        GameCollection.insert(gameObject, function(error, gameID) {
          // console.log(error, gameID);
          $state.go('lobby', {'gameID': gameID});
        });

      };

      this.isHost = function (gameID, $scope) {
        clientID = Meteor.userId();
        var obj = GameCollection.findOne({_id: gameID});
        var host = obj.host;
        console.log(host);
        // return host === clientID;
        return true;
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

