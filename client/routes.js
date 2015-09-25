angular.module("jog-it-off").run(["$rootScope", "$state", "$location", function($rootScope, $state, $location) {
  $rootScope.$on("$stateChangeSuccess", function(event, next) {
    // $state.go('main');
  });
}]);


angular.module("jog-it-off").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

     $locationProvider.html5Mode(true);

     $stateProvider
      .state('main', { //parent
        url: '/',
        templateUrl: 'client/games/views/main.ng.html',
        controller: 'mainController'
      })
      .state('create', { //parent
        url: '/create',
        templateUrl: 'client/games/views/create.ng.html',
        controller: 'createGameController'
      })
      .state('join', {  //parent
        url: '/join',
        templateUrl: 'client/games/views/join.ng.html',
        controller: 'joinController'
      })
      .state('game', { //parent
        url: '/game/:gameID',
        templateUrl: 'client/games/views/game.ng.html',
        controller: 'gameController',
      })
      .state('game.lobby', { //child of game
        templateUrl: 'client/games/views/lobby.ng.html',
        controller: 'lobbyController',
      })
      .state('countdown', { //parent
        url: '/plot_countdown',
        templateUrl: 'client/games/views/plot_countdown.ng.html',
        controller: 'plotcountdown',
      })
      .state('set_point', {
        url: '/set_point',
        templateUrl: 'client/games/views/set_point.ng.html',
        controller: 'setPoint'
      })
      .state('confirm_point', {
        url: '/confirm_point',
        templateUrl: 'client/games/views/confirm_point.ng.html',
        controller: 'lobbyController',
      })
      .state('plotted_point', {
        url: '/plotted_point',
        templateUrl: 'client/games/views/plotted_point.ng.html',
        controller: 'lobbyController',
      })
      .state('gamecountdown', {
        url: '/game_countdown',
        templateUrl: 'client/games/views/game_countdown.ng.html',
        controller: 'gamecountdown',
      })
      .state('final' , { //parent
        url: '/final',
        templateUrl: 'client/games/views/final_score.ng.html',
        controller: 'finalscore'
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

