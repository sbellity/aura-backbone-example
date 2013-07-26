define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    userLogin: function() {
      var user = this.get('user');
      return user && user.login;
    }
  });
});