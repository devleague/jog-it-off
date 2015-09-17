Router.configure({
  layoutTemplate: "layout"
});

// Router.route('/', {
//   name: 'login',
//   onBeforeAction: function(){
//     if(Meteor.user()) {
//       this.redirect('/main');
//     } else {
//       this.next();
//     }
//   }
// });

// Router.route('/', function () {
//   this.render('login');
// });

Router.route('/', function () {
  this.render('main');
});

Router.route('/create', function () {
  this.render('create');
});

Router.route('/join', function () {
  this.render('join');
});

Router.route('/lobby/:room', function () {
  console.log(this.params.room);
  this.render('lobby', {data:{room: this.params.room}});
});

Router.route('/maptest', function () {
  this.render('maptest');
});


// Router.onBeforeAction(function () {
//   //if there is no user logged in and if no one is in the process of logging in
//   if(!Meteor.user() && !Meteor.loggingIn()) {
//     //take to login
//     this.render('login');
//   } else {
//     // take to dashboard
//     this.next();
//   }
// }, {
//   //using template name :D
//   except: ['login']
// });