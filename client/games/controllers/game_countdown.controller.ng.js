 angular
    .module('jog-it-off')
    .controller('gameCountDown', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {
      //controller after plot then game starts!
      $scope.countNum = 5;
      var num = 5;
      var audio = new Audio('/audio/get_ready.m4a');
      audio.play();

      $interval(function() {
          num--;
          $scope.countNum = num;
          if($scope.countNum <= 0) {
             $state.go('game.session');
          }
        }, 1000, 5);

  });