angular
    .module('jog-it-off')
    .controller('mainController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.here = true;
      $scope.message = function () {

        $scope.here = !$scope.here;
      };


  });