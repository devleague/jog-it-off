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
