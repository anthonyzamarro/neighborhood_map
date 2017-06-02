var map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 42.343907, lng: -71.094525},
  zoom: 13,
  mapTypeControl: false
});
}

window.addEventListener('load', initMap);
