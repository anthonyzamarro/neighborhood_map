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

var item;
this.viewList = ko.observableArray([]);
  array.forEach(function(listItem){
    self.viewList.push(listItem);
  });

this.list = ko.observable(self.viewList()[0]);

this.url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=1&titles=List_of_colleges_and_universities_in_metropolitan_Boston';

     $.ajax({
       url: this.url,
       data: { action: 'query', format: 'json'},
       dataType: 'jsonp',
       success: function (x) {
         console.log(x.query.pages[402352].revisions[0]['*']);
       }
})
}

ko.applyBindings(new ViewModel());
});
