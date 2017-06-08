//Use Foursquare API to get restaurant data to populate model
var url = 'https://api.foursquare.com/v2/venues/search'
var response, name, contact, address, url, type, lat, lng, vm, map, marker, visible, listName, test;

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

// function getData(restaurants){
  $.ajax({
   url: url,
   dataType: 'json',
   timeout: 1000,
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
     for (var i = 0; i < response.length; i++) {
       vm.restaurants.push(new Restaurant(response[i]));
       makeMarkers(new Restaurant(response[i]));
       ViewModel(new Restaurant(response[i]));
     }
   },
   error: function() {
     alert('Sorry! Data unavailable at this time. Please refresh the page and try again.');
   }
  });
// }

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
      //Set up items to be filtered for later
       listName = marker.name;
       visible = marker.visible;
      //  test = listName.indexOf()

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
      this.marker = marker;
      this.visible = visible;
      this.restaurants = ko.observableArray([]);
      this.searchList = document.getElementById('search-box');
      this.searchList = ko.observable();
      this.testArr = ko.observableArray([]);

      //Show infowindow when user clicks restaurant in list view
      this.restaurantClick = function (infowindowData) {
        makeMarkers(infowindowData);
        marker.setAnimation(google.maps.Animation.NULL);
        infowindow.setContent('<h3>' + infowindowData.name + '</h3>' + '<br />' +
                              '<div>' + infowindowData.address + '</div>' +
                              '<div><a target="_blank" href="' + infowindowData.url + '">' + 'Visit their website' + '</div>');
        infowindow.open(map, marker);
      };


      self.testArr().push(listName)

      this.filter = ko.computed(function() {
        if(self.searchList() == self.testArr()) {
          console.log(true);
        } else {
          console.log(self.testArr());
        }
      });
      this.searchBtn = function () {

      }
    }
}
