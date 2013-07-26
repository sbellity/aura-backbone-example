define(function() {
  // since backbone is already resolved when the app starts
  // we can directly require it !
  return require('backbone').Model.extend({
    userLogin: function() {
      var user = this.get('user');
      return user && user.login;
    }
  });
});