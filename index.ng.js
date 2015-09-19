Locations = new Mongo.Collection("locations");

if (Meteor.isClient) {
  //declare module
  // angular.module('jog-it-off',['angular-meteor', 'ui.router']);


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Locations.find().count() === 0) {
      var locations = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < locations.length; i++)
        Locations.insert(locations[i]);
    }
  });
}