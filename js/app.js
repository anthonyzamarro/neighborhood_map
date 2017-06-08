//Use Foursquare API to get restaurant data to populate model
// var url = 'https://api.foursquare.com/v2/venues/search?client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST%20&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT%20&near=boston&query=restaurants%20&v=20200131%20&m=foursquare';
var url = 'https://api.foursquare.com/v2/venues/search'
var response, name, contact, address, url, type, lat, lng, vm, map, marker, visible, listName;

//Constructor function to create Restaurant info
var Restaurant = function (data) {
  var self = this;
  this.name = data.name;
  this.type = data.categories[0].name;
  this.address = data.location.address + ' ' + data.location.city + ','  + data.location.state + ' ' +  data.location.postalCode;
  this.contact = data.contact.formattedPhone;
  this.url = data.url;

  this.position = {lat: data.location.lat, lng: data.location.lng};
}

//Create map and use Foursquare data to get locations and restaurant details
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.355709, lng: -71.057205},
  zoom: 13,
  mapTypeControl: false
});
vm = new ViewModel();

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
  //  limit: 15
 },
 success: function (data) {
   response = data.response.venues;
   for (var i = 0; i < response.length; i++) {
     vm.restaurant.push(new Restaurant(response[i]));

     makeMarkers(new Restaurant(response[i]));
     ViewModel(new Restaurant(response[i]));
   }
 },
 error: function() {
   alert('Sorry! Data unavailable at this time. Please refresh the page and try again.');
 }
});

    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    //Create markers and infowindows for each location
    function makeMarkers(markerData) {
      marker = new google.maps.Marker({
        position: markerData.position,
        name: markerData.name,
        map: map,
        animation: google.maps.Animation.DROP
      });
       listName = marker.name;

       marker.addListener('click', function(){
        populateInfoWindow(markerData, infowindow);
      });

      bounds.extend(marker.position);
  }

    function populateInfoWindow(markerData, infowindow) {
      makeMarkers(markerData);
      marker.setAnimation(google.maps.Animation.NULL);
        infowindow.setContent('<h3>' + markerData.name + '</h3>' + '<br />' +
                              '<div>' + markerData.address + '</div>' +
                              '<div><a target="_blank" href="' + markerData.url + '">' + 'Visit their website' + '</div>');
        infowindow.open(map, marker);
      };
  //Use Foursquare data to populate the list
  function ViewModel(restaurantData) {
      var self = this;
      this.markerName = listName;
      this.restaurant = ko.observableArray([]);
      this.searchList = document.getElementById('search-box');
      this.searchList = ko.observable()

      //Show infowindow when user clicks restaurant in list view
      this.restaurantClick = function (infowindowData) {
        makeMarkers(infowindowData);
        marker.setAnimation(google.maps.Animation.NULL);
        infowindow.setContent('<h3>' + infowindowData.name + '</h3>' + '<br />' +
                              '<div>' + infowindowData.address + '</div>' +
                              '<div><a target="_blank" href="' + infowindowData.url + '">' + 'Visit their website' + '</div>');
        infowindow.open(map, marker);
      };

      this.filter = ko.computed(function() {
        self.searchList()
        
      });


      this.searchBtn = function () {

      }
    }
}
