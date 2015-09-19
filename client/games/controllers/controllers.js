  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$state', '$meteor', 'JogService', function ($scope, $state, $meteor, JogService) {

      $scope.addGameObject = JogService.addGameObject;
  }]);


