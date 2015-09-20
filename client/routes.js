angular.module("jog-it-off").run(["$rootScope", "$state", "$location", function($rootScope, $state, $location) {
  $rootScope.$on("$stateChangeSuccess", function(event, next) {
    // $state.go('main');
  });
}]);


angular.module("jog-it-off").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

     $locationProvider.html5Mode(true);

     $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'client/games/views/main.ng.html',

      })
      .state('create', {
        url: '/create',
        templateUrl: 'client/games/views/create.ng.html',
        controller: 'createGameController'
      })
      .state('join', {
        url: '/join',
        templateUrl: 'client/games/views/join.ng.html',
        controller: 'joinController'
      })
      .state('lobby', {
        url: '/lobby/:gameID',
        templateUrl: 'client/games/views/lobby.ng.html',
        controller: 'lobbyController',
      })
      .state('countdown', {
        url: '/countdown',
        templateUrl: 'client/games/views/game_starts.ng.html',
        controller: 'lobbyController',
      })
      .state('set_point', {
        url: '/set_point',
        templateUrl: 'client/games/views/set_point.ng.html',
        controller: 'lobbyController',
      });



  }]);



// Router.configure({
//   layoutTemplate: "layout"
// });

// Router.route('/', function () {
//   this.render('main');
// });

// Router.route('/create', function () {
//   this.render('create');
// });

// Router.route('/join', function () {
//   this.render('join');
// });

// Router.route('/lobby/:room', function () {
//   console.log(this.params.room);
//   this.render('lobby', {data:{room: this.params.room}});
// });

// Router.route('/maptest', function () {
//   this.render('maptest');
// });

