// var map;

var initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.355709, lng: -71.057205},
  zoom: 13,
  mapTypeControl: false
});
var locations = [
  {title: 'Harvard University', location: {lat: 42.377003, lng:-71.116660}},
  {title: 'Massachusetts Institute of Technology', location: {lat: 42.360091, lng:-71.094160}},
  {title: 'Northeastern University', location: {lat: 42.339807, lng:-71.089172}},
  {title: 'Boston University', location: {lat: 42.350500, lng:-71.105399}},
  {title: 'Boston College', location: {lat: 42.335549, lng:-71.168495}},
  {title: 'Suffolk University', location: {lat: 42.358520, lng:-71.061356}},
  {title: 'Emerson College', location: {lat: 42.352030, lng:-71.065655}}
]
        //Create markers for each location
        for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;

          var marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
            id: i
          });
        }
}
