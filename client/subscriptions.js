Meteor.subscribe("games", function () {
  return GameCollection.find({
    user_id: this.userId
  });
});