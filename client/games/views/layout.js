if (Meteor.isClient) {

  Template.login.helpers({
    loggedIn: function() {
      return Meteor.userId();
    }
  });

  Template.login.events({
    'submit form': function(e, tmpl) {
        var input;
        e.preventDefault();

        input = tmpl.find("input[name=username]");
        input.blur();
        console.log('username form');
        return Meteor.insecureUserLogin(input.value);
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
}