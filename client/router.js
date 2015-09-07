Router.configure({
  layoutTemplate: "layout"
});

Router.route('/', function () {
  this.render('main');
});

Router.route('/create', function () {
  this.render('create');
});