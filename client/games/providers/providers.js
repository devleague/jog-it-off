(function() {
  angular
    .module('jog-it-off')
    .service('JogService', function ($state) {

      this.addGameObject = function(roomName, pointNum, plotTime, gameTime, $meteor, $state) {
        console.log('adding game obj');
        var client = Meteor.user();
        var host = client.username;
        var plotTimer = plotTime * 60;
        var gameTimer = gameTime * 60;

        GameCollection.insert({
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
        });

        // $state.go('lobby', {'param': roomName });
        $state.go('main');
      };

    });
})();
