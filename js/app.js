//Use Foursquare API to get restaurant data to populate model
var url = 'https://api.foursquare.com/v2/venues/search'
var response, vm, map, marker;
//Constructor function to format Restaurant info
var Restaurant = function (data) {
  var self = this;
  this.name = data.name;
  this.type = data.categories.length > 0 ? data.categories[0].name : "";
  this.address = data.location.address + ' ' + data.location.city + ', '  + data.location.state + ' ' +  data.location.postalCode;
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
var streetViewService = new google.maps.StreetViewService();

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
         this.contact  = restaurantData.contact;
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
             //Click on marker to open infowindow
             marker.addListener('click', function(){
             populateInfoWindow(this, infowindow);
           });
           //Populate info windows with api data
          populateInfoWindow =  function (marker, infowindow) {
              if(infowindow.marker != marker) {
                infowindow.setContent('');
                infowindow.marker = marker;
                infowindow.addListener('closeclick', function() {
                  infowindow.marker = null;
                });
                //Get image of restaurant
                var radius = 50;
                var windowContent = '<h2 id="windowName">' + restaurantData.name + '</h2>' + '<div id="pano"></div>' +
                                    '<div class="windowStyles">' + restaurantData.address + '</div>' +
                                    '<div class="windowStyles">' + restaurantData.contact + '</div>' +
                                    '<div class="windowStyles"><a target="_blank" href="' + restaurantData.url + '">' +
                                    'Visit their website' + '</div>';
               function getStreetView(data, status) {
                if(status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                 var heading = google.maps.geometry.spherical.computeHeading(
                  nearStreetViewLocation, marker.position);
                  infowindow.setContent(windowContent);
                  var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                      heading: heading,
                      pitch: 10
                    }
                  };
                  var panorama = new google.maps.StreetViewPanorama(
                                 document.getElementById('pano'), panoramaOptions);
                        } else {
                          infowindow.setContent('div' + restaurantData.name + '</div>' +
                          '<div>No Street View Found</div>');
                        }
                      }
                      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                      //Open the infowindow on the correct marker
                      infowindow.open(map, marker);
              }
            };
            restaurantData.infowindow = populateInfoWindow
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

        //Show infowindow when user clicks restaurant in list view
        this.restaurantClick = function (infowindowData) {
          var windowContent = '<h2 id="windowName">' + infowindowData.name + '</h2>' + '<div id="pano"> </div>' +
                              '<div class="windowStyles">' + infowindowData.address + '</div>' +
                              '<div class="windowStyles">' + infowindowData.contact + '</div>' +
                              '<div class="windowStyles"><a target="_blank" href="' + infowindowData.url + '">' +
                              'Visit their website' + '</div>'
          infowindow.setContent(windowContent);
          infowindow.open(map, marker);
         };
        //Filter view list and markers
        self.filteredList = ko.computed(function() {
            var filter = self.searchRestaurants().toLowerCase();
            if(!filter) {
              return self.restaurants();
            } else {
                return ko.utils.arrayFilter(self.restaurants(), function(restaurant) {
                var filtered = restaurant.name.toLowerCase().indexOf(filter) > -1;
                return filtered;
              });
            }
        }, self.filteredList);

        this.searchBtn = function () {

        }
        getData(this.restaurants)
      }

}
