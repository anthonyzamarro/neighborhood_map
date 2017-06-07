//Use Foursquare API to get restaurant data to populate model
// var url = 'https://api.foursquare.com/v2/venues/search?client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST%20&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT%20&near=boston&query=restaurants%20&v=20200131%20&m=foursquare';
var url = 'https://api.foursquare.com/v2/venues/search'
var response, name, contact, address, url, type, lat, lng;

var Restaurant = function (data) {
  var self = this;
  this.name = data.name;
  this.type = data.categories[0].name;
  this.address = data.location.address + ' ' + data.location.city + ','  + data.location.state + ' ' +  data.location.postalCode;
  this.contact = data.contact.formattedPhone;
  this.url = data.url;

  this.position = {lat: data.location.lat, lng: data.location.lng};
}

//Extract API data and cache wanted values
// function model(_data) {
//   // console.log(_data);
//   for (var i = 0; i < _data.length; i++) {
//     name = _data[i].name;
//     type = _data[i].categories[0].name;
//     address = _data[i].location.address + ' ' + _data[i].location.city + ','  + _data[i].location.state + ' ' +  _data[i].location.postalCode;
//     lat = _data[i].location.lat;
//     lng = _data[i].location.lng;
//     contact = _data[i].contact.formattedPhone;
//     url = _data[i].url;
//
//     //store values into model
//     restaurantModel = {
//         name: name,
//         type: type,
//         address: address,
//         lat: lat,
//         lng: lng,
//         contact: contact,
//         url: url
//       }
//       ViewModel(restaurantModel);
//       //Why doesn't all data log? At least 8 objects are missing at any time.
//   }
// }

//Use Foursquare data to populate the list
function ViewModel() {
  var self = this;

  this.restaurant = ko.observableArray([]);

  }

//Create map and use Foursquare data to get locations and restaurant details
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.355709, lng: -71.057205},
  zoom: 13,
  mapTypeControl: false
});

var vm = new ViewModel();

ko.applyBindings(vm);

$.ajax({
 url: url,
 dataType: 'json',
 data: {
   client_id: "MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST",
   client_secret: "EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT",
   v: 20170604,
   near: "boston",
   query: "restaurant",
   async: true,
   limit: 15
 },
 success: function (data) {
   response = data.response.venues;
   for (var i = 0; i < response.length; i++) {
     vm.restaurant.push(new Restaurant(response[i]));

     makeMarkers(new Restaurant(response[i]))
   }
 },
 error: function(e) {
   alert('Sorry! Data unavailable at this time. Please refresh the page and try again.');
 }
});

var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow();

//Create markers and infowindows for each location
function makeMarkers(marker) {
  // console.log(marker.position);
  var marker = new google.maps.Marker({
    position: marker.position,
    name: marker.name,
    map: map,
    animation: google.maps.Animation.DROP,
  });


  bounds.extend(marker.position)

  marker.addListener('click', function(){
    populateInfoWindow(this, infowindow)

  });
    function populateInfoWindow(marker, infowindow) {
        infowindow.setContent('<h3>' + marker.name + '</h3>');
        infowindow.open(map, marker);
    };


}

}
