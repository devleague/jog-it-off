Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {
  //declare module
  angular.module('jog-it-off',['angular-meteor', 'ui.router']);

  angular.module('jog-it-off')
  .controller('timerController', TimerController);

  function TimerController($scope, $meteor, $interval) {
    $scope.timer = "5:00";

    var fiveMinutes = 60 * 5;
    startTimer(fiveMinutes);

    function startTimer(duration) {
      var timer = duration;
      $interval(function () {
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        textContent = minutes + ":" + seconds;

        $scope.timer = textContent;

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    }
  }
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