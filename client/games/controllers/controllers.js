  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$meteor', 'JogService', function ($scope, $meteor, JogService) {

      $scope.addGameObject = JogService.addGameObject;
  }]);


