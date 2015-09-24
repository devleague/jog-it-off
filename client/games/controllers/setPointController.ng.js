 angular
    .module('jog-it-off')
    .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

      $scope.timer = Meteor.user().profile.game.plotTimer;
      var num = $scope.timer;
      $scope.hour = 0;
      $scope.min = 0;
      $scope.sec = 0;

      //sets timer countdown
      $interval(function() {
          console.log($scope.timer);
          num--;
          $scope.timer = num;

          $scope.hour = parseInt( $scope.timer / 3600 );
          $scope.min = parseInt( ($scope.timer - ($scope.hour * 3600)) / 60 );
          $scope.sec = parseInt( $scope.timer - ($scope.hour * 3600) - ($scope.min * 60) );

          if($scope.timer <= 0) {
            $state.go('gamecountdown');
          }
        }, 1000, num);

      //set minutes


       });