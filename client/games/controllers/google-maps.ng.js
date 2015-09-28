 angular.module('jog-it-off')
  .controller('mapController', function ($scope, uiGmapGoogleMapApi, $interval, $window) {
    $scope.showMap = true;
    $scope.markers = [];
    $scope.setMarker = setMarker;
    var navigator = $window.navigator;

    function setMarker () {
      $scope.markers.push({_id: +(new Date()), location: {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude}});
      console.log($scope.markers);
    }


    function setPlayerPosition (position) {

      $scope.showMap = false;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.map.center.latitude = position.coords.latitude;
      $scope.showMap = true;
    }

    if(navigator.geolocation){
      var options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0
      };
      var pos = {
        lat: null,
        lng: null
      };

      var stop = $interval(function () {

        navigator.geolocation.getCurrentPosition(setPlayerPosition,null,options);
      }, 5000);

    } else {
      handleLocationError(false, $scope.map, map.getCenter());
    }
    $scope.map = {
      center: {
        latitude: $scope.latCord || 21.315603,
        longitude: $scope.lngCord || -157.858093
      },
      refresh: $scope.showMap,
      zoom: 20,
      events:{
        click: function (mapModel, eventName, originalEventArgs) { //added new attribute
          if (!$scope.map){
            return;
          }

          if (!$scope.map.location){
            $scope.map.location = {};
          }

          $scope.map.location.latitude = latLng.lat();
          $scope.map.location.longitude = latLng.lng();
          //scope apply required because this event handler is outside of the angular domain
          $scope.$apply();
        }
      },
      marker: {
        options: { draggable: false },
        events: {

        }
      }
    };
  });