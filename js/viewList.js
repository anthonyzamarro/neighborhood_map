$(document).ready(function(){
// var search = document.getElementById('searchBox');
var array = [
  {
    name: 'Harvard University'
  },
  {
    name: 'Massachusetts Institute of Technology'
  },
  {
    name: 'Northeastern University'
  },
  {
    name: 'Boston University'
  },
  {
    name: 'Boston College'
  },
  {
    name: 'Suffolk University'
  },
  {
    name: 'Emerson College'
  }

]



var ViewModel = function () {
var self = this;

this.viewList = ko.observableArray([]);
  array.forEach(function(listItem){
    self.viewList.push(listItem);
  });

this.list = ko.observable(self.viewList()[0])


this.url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=list+of+colleges+and+universities+in+metropolitan+boston&namespace=0&limit=10';

     $.ajax({
       url: this.url,
       data: { action: 'opensearch', format: 'json'},
       dataType: 'jsonp',
       success: function (x) {
         console.log(x);
       }
})
}

ko.applyBindings(new ViewModel());
});
