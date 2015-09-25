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
      .state('game', {
        url: '/game/:gameID',
        templateUrl: 'client/games/views/game.ng.html',
        controller: 'gameController',
      })
      .state('game.lobby', {
        templateUrl: 'client/games/views/lobby.ng.html',
        controller: 'lobbyController',
      })
      .state('game.plot_countdown', {
        templateUrl: 'client/games/views/plot_countdown.ng.html',
        controller: 'plotcountdown',
      })
      .state('game.set_point', {
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
      .state('game.game_countdown', {
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