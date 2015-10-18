angular
    .module('jog-it-off')
    .controller('gameSession', function ($scope, uiGmapGoogleMapApi, $interval, $state, $meteor, $rootScope, JogService, $window, $stateParams) {

      var clientID = Meteor.userId();
      gameID = $stateParams.gameID;
      $scope.finishButton = finishButton;
      $scope.isHost = JogService.isHost($scope.gameID);
      $scope.gameObj = $meteor.object(GameCollection, $stateParams.gameID, true);
      $scope.pickUpMarker = pickUpMarker;
      $rootScope.wink = false;
      $scope.getPoint = false;
      $scope.message = "";

      Meteor.users.update({_id: clientID}, {$set: {"profile.coins": []}});

      //TIMER-----------------
      $scope.gameTimer = $scope.gameObj.gameTimer;
      var num = $scope.gameTimer;
      $scope.hour = 0;
      $scope.min = 0;
      $scope.sec = 0;

      var intervalPromise = $interval(function() {
        $scope.hour = parseInt( $scope.gameObj.gameTimer / 3600 );
        $scope.min = parseInt( ($scope.gameObj.gameTimer - ($scope.hour * 3600)) / 60 );
        $scope.sec = parseInt( $scope.gameObj.gameTimer - ($scope.hour * 3600) - ($scope.min * 60) );

        if($scope.isHost) {
        GameCollection.update({_id: $scope.gameID}, {$inc: {gameTimer: -1} });
        }

        if($scope.gameObj.gameTimer < 0) {
          $state.go('game.final', $interval.cancel(intervalPromise));
        }
        console.log($scope.gameTimer, "wow I'm a clock");

      }, 1000, $scope.plotTimer + 1);




      //MAP---------------------
      $scope.markers = $scope.gameObj.markers;
      $scope.showMap = true;
      $scope.circles = circle;
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
          // alert("this is the distance" + distance);

          closestMarker = $scope.markers[closest];

          if (distance <= 5){

            console.log('$scope.markers[closest]');
            console.log($scope.markers[closest]);


            // is it a point type?
            if ($scope.markers[closest].type !== "point") {
              // alert("This area is not a point marker location.");

              return;
            }

            // did you not drop this marker?
            if ( $scope.markers[closest].userID === Meteor.userId() ) {
              // alert("You cannot pick up your own point locations!");
              return;
            }

            console.log("indexOf");
            console.log(Meteor.user().profile.coins.indexOf($scope.markers[closest]._id));
            //do you not already have this markerID?
            if (Meteor.user().profile.coins.indexOf($scope.markers[closest]._id) !== -1) {
              // alert("You already have this point marker location!");
              return;
            }

            //if all good, push markerID into user's coins array
            Meteor.users.update({_id: clientID}, {$push:{"profile.coins": $scope.markers[closest]._id}});
            // alert("You got a coin!");

          } else {
            // alert("You are not close enough to a point marker.");
              return;
          }

        });
      }

      function pickUpMarker () {
        // are you near a marker?
        console.log('boop');
        $scope.getPoint = true;
        find_closest_marker($scope.map.center);


      }

      function finishButton () {
        alert(closestMarker);
        if(closestMarker.type === "homebase") {
          Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.finish": Date.now()}});
          // alert("Good job!");
        } else {
          // alert("Not near homebase!");
        }
      }

    });