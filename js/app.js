//Use Foursquare API to get restaurant data to populate model
var url = 'https://api.foursquare.com/v2/venues/search'
var response, name, contact, address, url, type, lat, lng, vm, map, marker, visible, listName;
//Constructor function to create Restaurant info
var Restaurant = function (data) {
  var self = this;
  this.name = data.name;
  this.type = data.categories.length > 0 ? data.categories[0].name : "";
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

var bounds = new google.maps.LatLngBounds();
var infowindow = new google.maps.InfoWindow();

function getData(restaurants) {
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
     },
     success: function (data) {
       response = data.response.venues;
       for (var i = 0; i < response.length; i++) {
         restaurants.push(new Restaurant(response[i]));
       }
       //Create markers and infowindows for the marker
       restaurants().forEach(function(restaurantData){
         this.position = restaurantData.position;
         this.name  = restaurantData.name;
         this.address  = restaurantData.address;
         this.url  = restaurantData.url;
          //Create markers and infowindows for each location
           marker = new google.maps.Marker({
             position: this.position,
             name: this.name,
             map: map,
             animation: google.maps.Animation.DROP,
           });
           //Attach markers to restaurant objects
           restaurantData.marker = marker
             marker.addListener('click', function(){
             populateInfoWindow(this, infowindow);
           });
           //Populate info windows with api data
            function populateInfoWindow(marker, infowindow) {
              var streetViewService = new google.maps.StreetViewService();
              var radius = 50;

              function getStreetView (data, status) {
                if (status == google.maps.StreetViewStatus.OK) {
                  var nearStreetViewLocation = data.location.latlng;
                  var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                    marker.setAnimation(google.maps.Animation.NULL);
                    infowindow.setContent('<h3>' + this.name + '</h3>' + '<br />' +
                                          '<div>' + this.address + '</div>' +
                                          '<div><a target="_blank" href="' + this.url + '">' + 'Visit their website' + '</div>');
                }

              }

                infowindow.open(map, marker);
              };
           bounds.extend(marker.position);
       });
     },
     error: function() {
       alert('Sorry! Data unavailable at this time. Please refresh the page and try again.');
     }
    });
  }
  //Use Foursquare data to populate the list
  function ViewModel() {
    var self = this;
    this.restaurants = ko.observableArray([]);
    this.searchRestaurants = document.getElementById('search-box');
    this.searchRestaurants = ko.observable('');
    this.title = document.getElementById('title');
    this.title = ko.observable('Restaurants in Boston');
    this.arr = ko.observableArray([]);

        //Show infowindow when user clicks restaurant in list view
        this.restaurantClick = function (infowindowData) {
          infowindow.setContent('<h3>' + infowindowData.name + '</h3>' + '<br />' +
                                '<div>' + infowindowData.address + '</div>' +
                                '<div><a target="_blank" href="' + infowindowData.url + '">' + 'Visit their website' + '</div>');
          infowindow.open(map, marker);
        };

        self.filteredList = ko.computed(function() {
          self.searchRestaurants()
            var filter = self.searchRestaurants().toLowerCase();
            if(!filter) {
              return self.restaurants();
            } else {
                return ko.utils.arrayFilter(self.restaurants(), function(restaurant) {
                var filtered = restaurant.name.toLowerCase().indexOf(filter) > -1;
                return filtered
              });
            }
        }, self.filteredList);

        this.searchBtn = function () {

        }
        getData(this.restaurants)
      }

}
