angular
  .module('jog-it-off')
  .controller('setPoint', function ($scope, uiGmapGoogleMapApi, $window, $interval, $state, $meteor, $rootScope, JogService, $stateParams) {

    var clientID = Meteor.userId();
    gameID = $stateParams.gameID;
    $scope.isSetPoint = true;
    $scope.isHost = JogService.isHost($scope.gameID);
    $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);

    Meteor.users.update({_id: clientID}, {$set: {"profile.pointNum": $scope.gameObj.pointNum}});

    //TIMER--------------
    $scope.startPlotTimer = true;
    $scope.plotTimer = $scope.gameObj.plotTimer;
    var intervalPromise = $interval(function() {
      if($scope.isHost) {
      GameCollection.update({_id: $scope.gameID}, {$inc: {plotTimer: -1} });
      }
      if($scope.gameObj.plotTimer <= 0) {
        $state.go('game.game_countdown', $interval.cancel(intervalPromise));
      }
    }, 1000);


    //MAP------------------
    $scope.showMap = true;
    $scope.markers = [];
    $scope.circles = [];
    circle = $scope.circle;
    $scope.setMarker = setMarker;
    var navigator = $window.navigator;

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
      }, 500);

    } else {
      handleLocationError(false, $scope.map, map.getCenter());
    }

     $scope.homeExist = true;

    function setPlayerPosition (position) {
      $scope.showMap = false;

      $scope.map = {
        center: {
          latitude: null,
          longitude: null
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
          events: {}
        }

      };

      $scope.map.center.latitude = position.coords.latitude;
      $scope.map.center.longitude = position.coords.longitude;
      $scope.showMap = true;

      if ($scope.homeExist) {
        if ($scope.isHost) {
          var homebase = {
            _id: +(new Date()),
            type: "homebase",
            name: "homebase",
            location: {
              latitude: $scope.map.center.latitude,
              longitude: $scope.map.center.longitude
            }
          };
          GameCollection.update({_id: gameID}, {$push:{markers: homebase}});
        }
      }

      $scope.homeExist = false;
    }


    //make a marker--------------------
     function setMarker () {
      navigator.geolocation.getCurrentPosition(setPlayerPosition,null,options);
      var timestamp = +(new Date());
      var center = {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude};
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.markers.push({_id: timestamp, location: center});
      $scope.circles.push({
      id: timestamp,
      center: center,
      radius: 1,
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

    var pointDif = $scope.gameObj.pointNum - Meteor.user().profile.pointNum + 1;
    console.log(pointDif);

    GameCollection.update({_id: gameID},
      {$push:{markers:
        {
          _id: +(new Date()),
          type: "point",
          userID: clientID,
          name: Meteor.user().username + "_" + pointDif,
          location: {latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude},
        }
      }}
    );

    Meteor.users.update({_id: clientID}, {$inc:{"profile.pointNum":-1}});
    }
  });