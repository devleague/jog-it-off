Meteor.publish("games", function() {
  return GameCollection.find();
});

// Meteor.publish("game", function() {
//   return GameCollection.find({_id: gameID});
// });

// Meteor.publish("joinList", function (joinSubscriptions) {
//   return GameCollection.find({},{
//     sort: {timestamp: -1},
//     fields: {
//       _id: 1,
//       room: 1,
//       host: 1,
//       pointNum: 1,
//       plotTime: 1,
//       gameTime: 1
//     }
//   });
// });