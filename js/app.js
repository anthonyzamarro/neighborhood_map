
var letsGo = document.getElementById('lets-go');

letsGo.innerHTML = 'Kill it man';

var ViewModel = function () {
  var self = this;


  self.myMessage = ko.observable('Own this Shit');
}





ko.applyBindings(new ViewModel());
