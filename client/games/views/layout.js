// Template.layout.created = function (){
//   console.log('created');
// };

// Template.layout.rendered = function (){
//   console.log('rendered');
// };

// Template.layout.destroyed = function (){
//   console.log('destroyed');
// };

// // ------HELPERS-------------
// Template.layout.helpers({
// });

// Template.lobby.helpers({
//   // isHost: function() {
//   //   // return client===host;
//   // }
//   isHost: true
// });

Template.login.helpers({
  loggedIn: function() {
    return Meteor.userId();
  }
});

// // ------EVENTS-------------
// Template.layout.events({
// });

// Template.main.events({

// });

Template.login.events({
  'submit form': function(e, tmpl) {
      var input;
      e.preventDefault();

      input = tmpl.find("input[name=username]");
      input.blur();
      return Meteor.insecureUserLogin(input.value);
    },
  'click #createGame': function (evt, tmpl) {
      evt.preventDefault();
      Router.go('/create');
  },

  'click #joinGame': function (evt, tmpl) {
      evt.preventDefault();
      Router.go('/join');
  }
});

Deps.autorun(function(c) {
  try {
    UserStatus.startMonitor({
      threshold: 30000,
      idleOnBlur: true
    });
    return c.stop();
  } catch (exception) {
    console.log(exception);
  }
});



// Template.create.events({
//   'submit #createForm': function(evt, tmpl) {
//     evt.preventDefault();
//     var client = Meteor.user();
//     var host = client.username;
//     var room = event.target.roomName.value;
//     var pointNum = event.target.pointNum.value;
//     var plotTime = event.target.plotTime.value;
//     var gameTime = event.target.gameTime.value;

//     GameCollection.insert({
//       host: host,
//       room: room,
//       pointNum: pointNum,
//       plotTime: plotTime,
//       gameTime: gameTime,
//       timestamp: new Date(),
//       plotTimer: null,
//       gameTimer: null,
//       players: [client],
//       markers:[]
//     });

//     Router.go('/lobby/'+ room, {room: room});
//   }
// });

