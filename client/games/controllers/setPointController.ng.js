 angular
    .module('jog-it-off')
    .controller('setPoint', function ($scope, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

      // $scope.timer = Meteor.user().profile.game.plotTimer;
      $scope.plotTimer = $scope.gameObj.plotTimer;
      var num = $scope.plotTimer;
      $scope.hour = 0;
      $scope.min = 0;
      $scope.sec = 0;

      //sets timer countdown
      $interval(function() {
          console.log($scope.plotTimer);
          num--;
          $scope.plotTimer = num;

          $scope.hour = parseInt( $scope.plotTimer / 3600 );
          $scope.min = parseInt( ($scope.plotTimer - ($scope.hour * 3600)) / 60 );
          $scope.sec = parseInt( $scope.plotTimer - ($scope.hour * 3600) - ($scope.min * 60) );

          if($scope.plotTimer <= 0) {
            $state.go('gamecountdown');
          }
        }, 1000, num);

      //set minutes


       });