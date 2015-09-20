Meteor.publish("games", function() {
  return GameCollection.find();
});