 angular
    .module('jog-it-off')
    .controller('gameController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.gameID = $stateParams.gameID;
      $scope.gameCollection = $meteor.collection(GameCollection);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID);
      console.log("$scope.gameObj:" + $scope.gameObj);
      // $scope.game = {
      //   name: "billy"
      // };

      $scope.allReady = $scope.gameObj.allReady;

      // $scope.allReady = $meteor.collection(function() {
      //   return GameCollection.find({_id: $scope.gameID}, {
      //     allReady : $scope.getReactively('allReady')
      //   });
      // });
  });