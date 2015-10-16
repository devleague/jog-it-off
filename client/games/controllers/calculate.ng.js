 angular
    .module('jog-it-off')
    .controller('calculate', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      //push user result into gameObj-----
      var clientScore = [ Meteor.user().username, Meteor.user().profile.coins.length, Meteor.user().profile.finish];
      GameCollection.update({_id: gameID}, {$push: { score: clientScore }});

      //timer-----------------------------
      var num = 5;

      $interval(function() {
          num--;
          $scope.countNum = num;
          if($scope.countNum <= 0) {
            $state.go('game.final');
          }
        }, 1000, 5);
       });