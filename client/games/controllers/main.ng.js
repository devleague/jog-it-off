angular
    .module('jog-it-off')
    .controller('mainController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {

      $rootScope.wink = false;
      $scope.here = true;
      $scope.message = function () {

        $scope.here = !$scope.here;
      };


    var audio = new Audio('/audio/intro.m4a');
    function autoplay () {
      audio.play();
    }
    autoplay();

  });

