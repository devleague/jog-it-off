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
      });
      // .state('lobby', {
      //   url: '/lobby/:room',
      //   templateUrl: function($routeParams) {
      //     console.log($routeParams);
      //     return ;
      //   },
      //   controller: 'myController'
      // });


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

