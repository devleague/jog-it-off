 angular
    .module('jog-it-off')
    .controller('plotcountdown', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      var currentCount = 5;

      $scope.countDown = JogService.countDown(currentCount);
  });