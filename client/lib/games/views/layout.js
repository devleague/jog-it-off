Template.layout.created = function (){
  console.log('created');
};

Template.layout.rendered = function (){
  console.log('rendered');
};

Template.layout.destroyed = function (){
  console.log('destroyed');
};

// ------HELPERS-------------
Template.layout.helpers({
});

Template.lobby.helpers({
  // isHost: function() {
  //   // return client===host;
  // }
  isHost: true
});

// ------EVENTS-------------
Template.layout.events({
});

Template.main.events({
   'submit #createGame': function (evt, tmpl) {
      evt.preventDefault();
      var name = tmpl.find('#name').value;

      Meteor.go('/create');
   },

   'submit #joinGame': function (evt, tmpl) {
      evt.preventDefault();


      Meteor.go('/join');
   }
});

Template.create.events({
  'submit #createForm': function(evt, tmpl) {
    evt.preventDefault();
    var host = "userID";
    var room = event.target.roomName.value;
    var pointNum = event.target.pointNum.value;
    var plotTime = event.target.plotTime.value;
    var gameTime = event.target.gameTime.value;

    GameCollection.insert({
      host: host,
      room: room,
      pointNum: pointNum,
      plotTime: plotTime,
      gameTime: gameTime,
      timestamp: new Date(),
      plotTimer: null,
      gameTimer: null,
      participants: [],
      markers:[]
    });
  }
});