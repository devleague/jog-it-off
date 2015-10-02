angular
  .module('jog-it-off')
  .controller('setPoint', function ($scope, uiGmapGoogleMapApi, $window, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

    var clientID = Meteor.userId();
    gameID = $stateParams.gameID;
    $scope.isSetPoint = true;
    $scope.isHost = JogService.isHost($scope.gameID);
    // $scope.setPoint = JogService.setPoint;
    $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
    console.log($scope.gameObj.pointNum);

    Meteor.users.update({_id: clientID}, {$set: {"profile.pointNum": $scope.gameObj.pointNum}});

    //TIMER--------------
    $scope.plotTimer = $scope.gameObj.plotTimer;
    var num = $scope.plotTimer;
    $scope.hour = 0;
    $scope.min = 0;
    $scope.sec = 0;

    $interval(function() {
      $scope.hour = parseInt( $scope.gameObj.plotTimer / 3600 );
      $scope.min = parseInt( ($scope.gameObj.plotTimer - ($scope.hour * 3600)) / 60 );
      $scope.sec = parseInt( $scope.gameObj.plotTimer - ($scope.hour * 3600) - ($scope.min * 60) );

      if($scope.isHost) {
      GameCollection.update({_id: $scope.gameID}, {$inc: {plotTimer: -1} });
      }

      if($scope.gameObj.plotTimer <= 0) {
        $state.go('game.game_countdown');
      }

    }, 1000, $scope.plotTimer + 1);


    //MAP------------------
    $scope.showMap = true;
    $scope.markers = [];
    $scope.circles = [];
    circle = $scope.circle;
    $scope.setMarker = setMarker;
    var navigator = $window.navigator;

    //   //creating geofence
    // circle = $scope.map.drawCircle({
    //   lat: lattitude,
    //   lng: longitude,
    //   strokeColor: '#fff',
    //   strokeOpacity: 1,
    //   strokeWeight: 3,
    //   fillColor: 'rgba(75,255,0,0.2)',
    //   fillOpacity: 0.4,
    //   radius: 3000,
    //   editable: true,
    // });

    function setMarker () {
      var timestamp = +(new Date());
      var center = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.markers.push({_id: timestamp, location: center});
      $scope.circles.push({
      id: timestamp,
      center: center,
      radius: 3,
      stroke: {
        color: '#08B21F',
        weight: 2,
        opacity: 1
      },
      fill: {
        color: '#08B21F',
        opacity: 0.5
      },
      geodesic: false, // optional: defaults to false
      draggable: false, // optional: defaults to false
      clickable: false, // optional: defaults to true
      editable: false, // optional: defaults to false
      visible: true, // optional: defaults to true
      events:{}
    });

      GameCollection.update({_id: gameID},
        {$push:{markers:
          {
          _id: +(new Date()),
          type: "point",
          userID: clientID,
          location: {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude},
          // fences: [circle],
          // outside: function (marker, fence) {
          //   alert('This marker has been moved outside of its fence');
          // }
          }
        }}
      );



      Meteor.users.update({_id: clientID}, {$inc:{"profile.pointNum":-1}});
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
        // timeout: 3000,
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







    // $scope.map.circle.bindTo('center', $scope.markers, 'position');

  });