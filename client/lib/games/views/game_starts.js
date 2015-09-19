var currentCount = 5;

  var intervalTimer = setInterval(function(){
    if(currentCount === 0){
      clearInterval(intervalTimer);
      return Router.go('/set_point');
    }

    currentCount = self.currentSeconds.get() - 1;
    self.currentSeconds.set(currentCount);
  }, 1000);
