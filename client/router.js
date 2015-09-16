Router.configure({
  layoutTemplate: "layout"
});

Router.route('/', function () {
  this.render('main');
});

Router.route('/create', function () {
  this.render('create');
});

Router.route('/join', function () {
  this.render('join');
});

Router.route('/lobby', function () {
  this.render('lobby');
});

Router.route('/set_point', function () {
  this.render('set_point');
});

Router.route('/set_point_sure', function () {
  this.render('set_point_sure');
});

Router.route('/warning', function () {
  this.render('warning');
});

Router.route('/points_set', function () {
  this.render('points_set');
});

Router.route('/game_starts', function () {
  this.render('game_starts');
});

Router.route('/coin_collecting', function () {
  this.render('coin_collecting');
});

Router.route('/times_up', function () {
  this.render('times_up');
});

Router.route('/scores', function () {
  this.render('scores');
});