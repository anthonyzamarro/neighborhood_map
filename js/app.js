//Use Foursquare API to get restaurant data to populate model
// var url = 'https://api.foursquare.com/v2/venues/search?client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST%20&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT%20&near=boston&query=restaurants%20&v=20200131%20&m=foursquare';
var url = 'https://api.foursquare.com/v2/venues/search'
var response, name, contact, address, url, type, lat, lng;
var restaurantModel;
$.ajax({
 url: url,
 dataType: 'json',
 data: {
   client_id: "MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST",
   client_secret: "EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT",
   v: 20170604,
   near: "boston",
   query: "restaurant",
   async: true
 },
 success: function (data) {
   response = data.response.venues;
    model(response)
 },
 error: function(e) {
   alert('Sorry! Data unavailable at this time. Please refresh the page and try again.');
 }
});

//Extract API data and cache wanted values
function model(_data) {
  for (var i = 0; i < _data.length; i++) {
    name = _data[i].name;
    type = _data[i].categories[0].name;
    address = _data[i].location.address + ' ' + _data[i].location.city + ','  + _data[i].location.state + ' ' +  _data[i].location.postalCode;
    lat = _data[i].location.lat;
    lng = _data[i].location.lng;
    contact = _data[i].contact.formattedPhone;
    url = _data[i].url;

    //store values into model
    restaurantModel = [
      {
        name: name,
        type: type,
        address: address,
        lat: lat,
        lng: lng,
        contact: contact,
        url: url
      }
    ]
    getRestaurantModel(restaurantModel)
  }
}

function getRestaurantModel (restaurantModelData) {
  console.log(restaurantModelData);

}





//Use Foursquare data to populate the list
function ViewModel() {
var self = this;
// console.log(restaurantModel);





}

//Create map and use Foursquare data to get locations and restaurant details
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.355709, lng: -71.057205},
  zoom: 13,
  mapTypeControl: false
});

var locations = [
  {title: 'Five Guys', location: {lat: 42.377003, lng:-71.116660}},
  {title: 'Roxy\'s', location: {lat: 42.360091, lng:-71.094160}},
  {title: 'Amelia\'s Tanqueria', location: {lat: 42.339807, lng:-71.089172}},
  {title: 'Supper 88', location: {lat: 42.350500, lng:-71.105399}},
  {title: 'Eagle\s Deli', location: {lat: 42.335549, lng:-71.168495}},
  {title: 'Highspot Deli', location: {lat: 42.358520, lng:-71.061356}},
  {title: 'New York Pizza', location: {lat: 42.352030, lng:-71.065655}}
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


ko.applyBindings(new ViewModel());
