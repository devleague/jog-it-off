Template.layout.created = function (){
  console.log('created');
};

Template.layout.rendered = function (){
  console.log('rendered');
};

Template.layout.destroyed = function (){
  console.log('destroyed');
};

Template.layout.helpers({
});

Template.lobby.helpers({
  // isHost: function() {
  //   // return client===host;
  // }
  isHost: true
});

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
      var name = tmpl.find('#name').value;

      Meteor.go('/join');
}
});