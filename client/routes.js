angular.module("jog-it-off").run(["$rootScope", "$state", "$location", function($rootScope, $state, $location) {
  $rootScope.$on("$stateChangeSuccess", function(event, next) {
    // $state.go('main');
  });
}]);


angular.module("jog-it-off").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

     $locationProvider.html5Mode(true);

     $urlRouterProvider.otherwise('/');

     $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'client/games/views/main.ng.html',
        controller: 'mainController'
      })
      .state('rules', {
        url: '/rules',
        templateUrl: 'client/games/views/rules.ng.html',
        controller: 'rulesController'
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
      .state('game', {
        url: '/game/:gameID',
        templateUrl: 'client/games/views/game.ng.html',
        controller: 'gameController',
      })
      .state('game.lobby', {
        // url: '/lobby',
        templateUrl: 'client/games/views/lobby.ng.html',
        controller: 'lobbyController',
      })
      .state('map-points-no-players', {
        // url: '/map-points-no-players',
        templateUrl: 'client/games/views/map-points-no-players.ng.html',
        controller: 'gameController'
      })
      .state('game.plot_countdown', {
        // url: '/plot_countdown',
        templateUrl: 'client/games/views/plot_countdown.ng.html',
        controller: 'plotCountDown',
      })
      .state('game.set_point', {
        // url: '/set_point',
        templateUrl: 'client/games/views/set_point.ng.html',
        controller: 'setPoint'
      })
      .state('game.confirm_point', {
        // url: '/confirm_point',
        templateUrl: 'client/games/views/confirm_point.ng.html',
        controller: 'confirmPoint',
      })
      .state('game.plotted_point', {
        // url: '/plotted_point',
        templateUrl: 'client/games/views/plotted_point.ng.html',
        controller: 'plottedPoint',
      })
      .state('game.game_countdown', {
        // url: '/game_countdown',
        templateUrl: 'client/games/views/game_countdown.ng.html',
        controller: 'gameCountDown',
      })
      .state('game.session', {
        // url: '/game_session',
        templateUrl: 'client/games/views/game_session.ng.html',
        controller: 'gameSession',
      })
      .state('game.calculate' , {
        url: '/calculate',
        templateUrl: 'client/games/views/calculate.ng.html',
        controller: 'calculate'
      })
      .state('game.final' , {
        url: '/final_score',
        templateUrl: 'client/games/views/final_score.ng.html',
        controller: 'finalScore'
      })
      .state('map', {
        url: '/map',
        templateUrl: 'client/games/views/map-points-no-players.ng.html',
        controller: 'mapController'
      });
  }]);

