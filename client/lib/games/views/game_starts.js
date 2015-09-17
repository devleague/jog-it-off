var countdown = function(end, elements, callback) {
  var _second = 1000,
      _minute = _second * 60,
      _hour = _minute * 60,
      _day = _hour * 24,

      end = new Date(end),
      timer,

      calculate = function() {

        var now = new Date(),
            remaining = end.getTime() - now.getTime(),
            data;

        if(isNaN(end)){
          console.log('Invalid date/time');
          return;
        }

        if(remaining <= 0) {
          // route to next page
        } else {
          if(!timer) {
            timer = setInterval(calculate, _second);
          }
        }

        //

        console.log('second');
      };

  calculate();
}