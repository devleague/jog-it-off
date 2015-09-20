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

      this.isHost = function (host) {
        clientID = Meteor.userId();
        // console.log(clientID);
        // return host === clientID;
        return false;
      };

      this.roomName = function (gameID, $scope){
        var obj = GameCollection.findOne({_id: gameID});
        return obj.room;
      };

      this.roomPlayers = function (gameID, $scope){
        var obj = GameCollection.findOne({_id: gameID});
        console.log(obj.players);
        return obj.players;
      };



      this.getGames = function getGames () {

        // var bunnies = GameCollection.find();
        // console.log(bunnies);
        // return [{
        //    title: 'Ketchup and rubber buns',
        //    creator: 'Bill Murray',
        //    time: '5:00',
        //    points: 3
        //  }];
      };

    }]);
})();
