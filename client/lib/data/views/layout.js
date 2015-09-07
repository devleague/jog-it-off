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

Template.layout.events({
});

Template.main.events({
   'submit #createGame': function (evt, tmpl) {
    evt.preventDefault();
      var name = tmpl.find('#name').value;

      Meteor.go('/create');
   }
});