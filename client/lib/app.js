if (Meteor.isClient) {
  angular.module('myApp', ['angular-meteor', 'ui.router']);

  angular.module('myApp').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'parties-list.ng.html',
          controller: 'PartiesListCtrl'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'party-details.ng.html',
          controller: 'PartyDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/parties");
    }]);
}