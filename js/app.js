$(document).ready(function(){
// var letsGo = document.getElementById('lets-go');
// letsGo.innerHTML = 'Kill it man';
$.getJSON('https://api.foursquare.com/v2/venues/search?near=boston,ma&client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT&v=20200131', function(data){
  console.log(data);
})
var ViewModel = function () {
var self = this

this.name = ko.observable('name')

}

ko.applyBindings(new ViewModel());
});


// 'https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT'


//Searches for venues in NYC
// https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT&v=20200131

// &client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST&client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT&v=20200131
// client_id=MU5LQAECHVZLCEYZGSXIZ3BWLAQ5HZP3BRRHCRL1YJ1WJTST
// client_secret=EDFVN04UNKLC0FRNS20ORZPZJRTVIF4XAHDCMVCI2HGC1NTT
