Template.game_starts.rendered = function(){
  countdown('10/11/2013 06:30:00 PM', ['days', 'hours', 'minutes', 'seconds'], function(){
      console.log('Finished');
    });
};

  var intervalTimer = setInterval(function(){
    if(currentCount === 0){
      clearInterval(intervalTimer);
      return Router.go('/set_point');
    }

    currentCount = self.currentSeconds.get() - 1;
    self.currentSeconds.set(currentCount);
  }, 1000);
