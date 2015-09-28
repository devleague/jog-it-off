angular.module('jog-it-off', [
  'angular-meteor',
  'ui.router',
  'uiGmapgoogle-maps'
]);

// angular.module('jog-it-off')
//   .config(
//     function(uiGmapGoogleMapApiProvider) {
//         uiGmapGoogleMapApiProvider.configure({

//         });
//     }
// );

function onReady() {
  angular.bootstrap(document, ['jog-it-off']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

