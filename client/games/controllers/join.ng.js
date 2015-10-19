  angular
    .module('jog-it-off')
    .controller('joinController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;
       $scope.gameData = $meteor.collection(GameCollection);
      $scope.joinGame = JogService.joinGame;
      $rootScope.wink = false;

      GameCollection.remove({gameTimer: -1});

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
