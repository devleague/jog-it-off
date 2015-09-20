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

      this.getGames = function () {

      };

      this.countDown = function () {
        var currentCount = 5;

        var intervalTimer = setInterval(function(){
          if(currentCount === 0){
            clearInterval(intervalTimer);
            return Router.go('/set_point');
          }

          currentCount = self.currentSeconds.get() - 1;
          self.currentSeconds.set(currentCount);
        }, 1000);
      };

    }]);
})();
