Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {
  //declare module
  angular.module('jog-it-off',['angular-meteor', 'ui.router'])

    //   $scope.remove = function (location){
    //     $scope.locations.remove(location);
    //   };

    //   $scope.removeAll = function (locations) {
    //     $scope.remove(locations);
    //   };
    .controller('timerController', ['$scope', '$meteor', function ($scope, $meteor) {


      $scope.timer =
        // window.onload = function () {
            console.log('get onload');
            var fiveMinutes = 60 * 5,
                display = document.querySelector('#time');
            startTimer(fiveMinutes, display);
        // },
        function startTimer(duration, display) {
          console.log('in startTimer');
          var timer = duration, minutes, seconds;
          setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            textContent = minutes + ":" + seconds;
            console.log(textContent);

            if (--timer < 0) {
              timer = duration;
            }
          }, 1000);
        };

  }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Locations.find().count() === 0) {
      var locations = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < locations.length; i++)
        Locations.insert(locations[i]);
    }
  });
}