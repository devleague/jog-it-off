 angular
    .module('jog-it-off')
    .controller('plotCountDown', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      //controller after lobby
      $scope.countNum = 5;
      var num = 5;

      $interval(function() {
          num--;
          $scope.countNum = num;
          if($scope.countNum <= 0) {
            $state.go('game.set_point');
          }
        }, 1000, 5);


       });