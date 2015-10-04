angular.module('jog-it-off', [
  'angular-meteor',
  'ui.router',
   'uiGmapgoogle-maps'
]);

angular.module('jog-it-off')
  .config(
    function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
          v: '3.20',
          libraries: 'geometry'
        });
    }
);

function onReady() {
  angular.bootstrap(document, ['jog-it-off']);
}

// NEEDED, DO NOT DELETE OR COMMENT OUT!!
if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

