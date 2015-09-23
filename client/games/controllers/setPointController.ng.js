 angular
    .module('jog-it-off')
    .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.timer = Meteor.user().profile.game.plotTimer;
      var num = $scope.timer;


      $interval(function() {
          console.log($scope.timer);
          num--;
          $scope.timer = num;
          if($scope.timer <= 0) {
            $state.go('gamecountdown');
          }
        }, 1000, num);


       });