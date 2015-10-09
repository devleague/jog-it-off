angular
    .module('jog-it-off')
    .controller('gameSession', function ($scope, uiGmapGoogleMapApi, $interval, $state, $meteor, $rootScope, JogService, $window, $stateParams) {

      var clientID = Meteor.userId();
      gameID = $stateParams.gameID;
      $scope.finishButton = finishButton;
      $scope.isHost = JogService.isHost($scope.gameID);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.pickUpMarker = pickUpMarker;

      Meteor.users.update({_id: clientID}, {$set: {"profile.coins": []}});

      //TIMER-----------------
      $scope.gameTimer = $scope.gameObj.gameTimer;
       var intervalPromise = $interval(function() {
      if($scope.isHost) {
      GameCollection.update({_id: $scope.gameID}, {$inc: {gameTimer: -1} });
      }
      if($scope.gameObj.gameTimer <= 0) {
        $state.go('game.final', $interval.cancel(intervalPromise));
      }
    }, 1000);

      //MAP---------------------
      $scope.markers = $scope.gameObj.markers;
      console.log('$scope.markers', $scope.markers);
      $scope.showMap = true;
      $scope.circles = circle;
      var navigator = $window.navigator;



      function setPlayerPosition (position) {

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



      function rad(x) {return x*Math.PI/180;}
      function find_closest_marker(event){
        //assuming that event represents current position
        var lat = event.latitude;
        var lng = event.longitude;
        var R = 6371; //radius of earth meteric
        var distances = [];
        var closest = -1;
        for ( var i = 0; i < $scope.markers.length; i++) {
          var mlat = $scope.markers[i].location.lat;
          var mlng = $scope.markers[i].location.lng;
          var dLat  = rad(mlat - lat);
          var dLong = rad(mlng - lng);
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          distances[i] = d;
          if ( closest == -1 || d < distances[closest] ) {
            closest = i;
          }
        }
        //now we validate if closet is within 3m from
        var distance;

        uiGmapGoogleMapApi.then(function(maps) {
          var pointA = new maps.LatLng($scope.map.center.latitude, $scope.map.center.longitude);
          var pointB = new maps.LatLng($scope.markers[closest].location.latitude, $scope.markers[closest].location.longitude);
          console.log(pointA, pointB);
          var distance = maps.geometry.spherical.computeDistanceBetween(pointA, pointB);
          alert("this is the distance" + distance);

          closestMarker = $scope.markers[closest];

          if (distance <= 5) {

            console.log('$scope.markers[closest]');
            console.log($scope.markers[closest]);


            // is it a point type?
            if ($scope.markers[closest].type !== "point") {
              alert("This area is not a point marker location.");
              return;
            }

            // did you not drop this marker?
            if ( $scope.markers[closest].userID === Meteor.userId() ) {
              alert("You cannot pick up your own point locations!");
              return;
            }

            //do you not already have this markerID?
            if (Meteor.user().profile.coins.indexOf($scope.markers[closest]._id) !== -1) {
              alert("You already have this point marker location!");
              return;
            }

            //if all good, push markerID into user's coins array
            Meteor.users.update({_id: clientID}, {$push:{"profile.coins": $scope.markers[closest]._id}});
            alert("You got a coin!");

          } else {
            alert("You are not close enough to a point marker.");
              return;
          }

        });
      }

      function pickUpMarker () {
        navigator.geolocation.getCurrentPosition(setPlayerPosition,null,options);
        // are you near a marker?
        find_closest_marker($scope.map.center);

      }

      function finishButton () {
        alert(closestMarker);
        if(closestMarker.type === "homebase") {
          Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.coins": "homebase"}});
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.finish": Date.now()}});
          alert("Good job!");
        } else {
          alert("You are not near enough to homebase!");
        }
      }

    });