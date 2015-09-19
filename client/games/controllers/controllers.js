  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', 'JogService', function ($scope, JogService) {


        $scope.games = JogService.getGames();

  }]);
