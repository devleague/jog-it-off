  angular
    .module('jog-it-off')
    .controller('createGameController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.addGameObject = JogService.addGameObject;
      $rootScope.wink = true;
  });