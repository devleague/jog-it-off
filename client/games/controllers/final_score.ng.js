angular
    .module('jog-it-off')
    .controller('finalScore', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      console.log($scope.gameObj);

      $scope.returnMain = returnMain;

      function returnMain () {
        console.log('return me to main page');
        $state.go('main');
      }

       });