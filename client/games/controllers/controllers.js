  angular
    .module('jog-it-off')
    .controller('myController', ['$scope', '$meteor', function ($scope, $meteor) {
      $scope.loginSubmit = function() {
        console.log("HELLO DO U SEE ME?");
      };

      // Template.login.helpers({
      //   loggedIn: function() {
      //     return Meteor.userId();
      //   }
      // });
  }]);


