this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["awesome-widget/awesome"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1><%= repo %> !</h1>\n<ul class='unstyled'>\n<% _.each(issues, function(issue) { %>\n<li class='well'>\n  <h5><span class=\"label\"><%= issue.number %></span> <%= issue.title %></h5>\n  <p><%= issue.body %></p>\n</li>\n<% }); %>\n</ul>";
  });