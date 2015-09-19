  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$state', '$meteor', '$rootScope', 'JogService', function ($scope, $state, $meteor, rootScope, JogService) {

      $scope.addGameObject = JogService.addGameObject;
      $scope.isHost = JogService.isHost();
  }]);