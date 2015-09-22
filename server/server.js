Meteor.startup(function(){
  if(GameCollection.find().fetch().length === 0){
    GameCollection.insert({

      host: 'matt',
      room: 'Undersea Pineapple',
      pointNum: 3,
      plotTime: 5,
      gameTime: 20,
      timestamp: new Date(),
      plotTimer: null,
      gameTimer: null,
      players: ['ray', 'jenn', 'cannon', 'matt'],
      markers:[
        {
          id: "point1",
          lat: 2342,
          lng: 235,
          type: 'homebase',
          player: 'matt'
        },
        {
          id: "point2",
          lat: 242,
          lng: 245,
          type: 'player',
          player: 'ray'
        },
        {
          id: "point3",
          lat: 234,
          lng: 215,
          type: 'geofence',
          player: 'ray'
        },
        {
          id: "point4",
          lat: 282,
          lng: 135,
          type: 'geofence',
          player: 'jenn'
        }
      ]

    });
  }
});