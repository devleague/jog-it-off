angular
    .module('jog-it-off')
    .controller('finalScore', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      console.log($scope.gameObj, "this is the game object");

      gameID = $stateParams.gameID;

      $scope.returnMain = returnMain;

      var clientScore = [ Meteor.user().username, Meteor.user().profile.coins.length, Meteor.user().profile.finish];
      GameCollection.update({_id: gameID}, {$push: { score: clientScore }});

      $scope.score = GameCollection.findOne({_id: gameID}, {fields: {score: 1}});


      function returnMain () {
        console.log('return me to main page');
        $state.go('main');
      }

});





