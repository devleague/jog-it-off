 angular
    .module('jog-it-off')
    .controller('plotcountdown', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {



      $scope.countNum = 5;
      var num = 5;

      $interval(function() {
          console.log($scope.countNum);
          num--;
          $scope.countNum = num;
          if($scope.countNum <= 0) {
            $state.go('set_point');
          }
        }, 1000, 5);







       });