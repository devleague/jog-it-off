(function () {
angular
    .module('jog-it-off')
    .factory('JogService', ['$meteor', function ($meteor) {
      return {
        getGames: getGames
      };

      function getGames () {
        return [{
           title: 'Ketchup and rubber buns',
           creator: 'Bill Murray',
           time: '5:00',
           points: 3
         }];
      }

    }]);
})();