  angular
    .module('jog-it-off')
    .controller('joinController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;
       $scope.gameData = $meteor.collection(function() {
        return GameCollection.find({}, {sort: {timeNum: -1}});
      });
      $scope.joinGame = JogService.joinGame;
      $rootScope.wink = false;

      var now = new Date().getTime();
      var day = 86400000;

      //remove games that have already ended
      GameCollection
        .find({gameTimer: {$lt:1}})
        .forEach(function(x) {
          GameCollection.remove({_id: x._id});
        });

      //remove games that have existed for longer than 24 hrs
      // GameCollection.remove({timeNum: {$lt: now - tenSec}});
      GameCollection
        .find({timeNum: {$lt: now - day }})
        .forEach(function(x) {
          GameCollection.remove({_id: x._id});
        });

      $scope.joinList = $meteor.subscribe('joinList')
        .then(function (joinSubscriptions) {
          return GameCollection.find({},{
            sort: {timestamp: -1},
            fields: {
              _id: 1,
              room: 1,
              host: 1,
              pointNum: 1,
              plotTime: 1,
              gameTime: 1
            }
        });
      });


  });
