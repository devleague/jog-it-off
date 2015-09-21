
// function initialize(location){
//   console.log(location);
//   // var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
// }
// $(document).ready(function(){
//   navigator.geolocation.getCurrentPosition(initialize); //jquery code to get current position

// });


if (Meteor.isClient) {
    Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      google.maps.event.addListener(map.instance, 'click', function(event) {
        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng(), type:'homebase' }); // we will use a function to hardcode input
      });

      var markers = {};

      Markers.find().observe({
        added: function (document) { //create a marker for this document
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            //store the document_id on the marker in order
            //to update the document within the 'dragend' event below
            id: document._id
          });


          //this listener below lets us drag markers on the map and update their corresponding document
          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          //stores the marker instance within the markers object
          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }

      });

    });

      Template.map.events({
        'click #locationButton': function(){
         console.log('click');
         var latLng = Geolocation.latLng();
         Markers.insert({ lat: latLng.lat, lng: latLng.lng, type:'homebase' });

      }
        });




  });

  Meteor.startup(function() {
    GoogleMaps.load();

  });

  Template.map.helpers({
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          disableDefaultUI: true, //removes the annoying zoom option
          scrollwheel: false //doesn't let user zoom in and out with touching screen locks the zoom
          // draggable: false <-- this makes it locked in the position
          //to switch terrain view https://developers.google.com/maps/documentation/javascript/maptypes?hl=en
        };


      }

    }

  });

}





