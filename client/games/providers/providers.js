(function() {
  angular
    .module('jog-it-off')
    .service('JogService', ['$state', '$meteor', function ($state, $meteor) {
      // debugger;

      this.addGameObject = function(roomName, pointNum, plotTime, gameTime, $scope) {
        console.log('adding game obj');
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

        GameCollection.insert(gameObject);
        console.log($state);

        $state.go('lobby', {'gameObject': gameObject});
        // $state.go('main');
      };

      this.isHost = function (host) {
        clientID = Meteor.userId();
        // return host === clientID;
        return true;
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
