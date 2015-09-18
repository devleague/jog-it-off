angular.module("jog-it-off").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

     $locationProvider.html5Mode(true);

     $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'client/games/views/main.ng.html',
        controller: 'myController'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'client/games/views/create.html',
        controller: 'myController'
      })
      .state('join', {
        url: '/join',
        templateUrl: 'client/games/views/join.html',
        controller: 'myController'
      })
      .state('times-up', {
        url: '/times-up',
        templateUrl: 'client/games/views/times-up.ng.html'
      })
      .state('get-ready', {
        url: '/get-ready',
        templateUrl: 'client/games/views/get-ready.ng.html'
      })
      .state('time-remaining', {
        url: '/time-remaining',
        templateUrl: 'client/games/views/time-remaining.ng.html'
      })
      .state('map-points-no-players', {
        url: '/map-points-no-players',
        templateUrl: 'client/games/views/map-points-no-players.ng.html'
      });
      // .state('lobby', {
      //   url: '/lobby/:room',
      //   templateUrl: function($routeParams) {
      //     console.log($routeParams);
      //     return ;
      //   },
      //   controller: 'myController'
      // });

    $urlRouterProvider.otherwise("/");
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

