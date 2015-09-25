 angular
    .module('jog-it-off')
    .controller('gamecountdown', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      //controller after plot then game starts!
      $scope.countNum = 5;
      var num = 5;

      $interval(function() {
          console.log($scope.countNum);
          num--;
          $scope.countNum = num;
          if($scope.countNum <= 0) {
            //$state.go('set_point');
          }
        }, 1000, 5);

  });