angular
    .module('jog-it-off')
    .controller('mainController', function ($scope, $state, $meteor, $rootScope, JogService, $stateParams) {


    // (function playaudio (){
    //   var audio = new Audio('/audio/intro.m4a');
    //   audio.play();
    //   console.log('meh');
    // })();
    // playaudio();

  //   var audio = new Audio('/audio/intro.m4a');
  // //   audio.autoplay = true;

  //   function autoplay(){
  //     audio.autoplay = true;
  //     audio.load();
  //   }
  //   autoplay();

  //   $scope.playaudio = function (){
  //     var audio = document.getElementById("")
  //   };

    var audio = new Audio('/audio/intro.m4a');
    function autoplay () {
      audio.play();
    }
    autoplay();

  });

