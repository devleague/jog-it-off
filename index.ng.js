if (Meteor.isClient) {
  //declare module
  angular.module('jog-it-off',['angular-meteor']);

  // angular.module('jog-it-off').controller('PartiesListCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  //   $scope.parties = $meteor.collection(Parties);
  // }]);
}