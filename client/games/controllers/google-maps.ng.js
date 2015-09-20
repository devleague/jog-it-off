angular.module('jog-it-off')
  .controller('gameController', function ($scope, uiGmapGoogleMapApi) {
      $scope.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 12,
        events:{}
      };
  });