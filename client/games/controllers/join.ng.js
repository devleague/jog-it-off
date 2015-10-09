  angular
    .module('jog-it-off')
    .controller('joinController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var gameID = $stateParams.gameID;
      $scope.gameData = $meteor.collection(GameCollection);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.joinGame = JogService.joinGame;

      console.log($scope.gameData.length);

      $scope.joinList = $meteor.subscribe('joinList')
        .then(function (joinSubscriptions) {
          return GameCollection.find({hasStarted: false},{
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
