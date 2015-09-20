angular.module('jog-it-off', [
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps'
]);

function onReady() {
  angular.bootstrap(document, ['jog-it-off']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);