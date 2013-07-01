(function() {
  var historyStarted = false;
  define({
    name: "Aura Backbone",
    require: {
      paths:  { backbone: 'components/backbone/backbone' },
      shim:   { backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] } }
    },
    
    initialize: function(app) {
      var Backbone = require('backbone');
      app.core.mvc =  Backbone;

      var Views = {};

      app.core.registerComponentCallback('before:initialize', function(options) {
        var View = Views[options.ref]
        if (!View) {
          var ext = _.pick(this, 'model', 'collection', 'id', 'attributes', 'className', 'tagName', 'events');
          Views[options.ref] = View = Backbone.View.extend(ext);
        }
        this.view = new View({ el: this.$el });
        this.view.sandbox = this.sandbox;
        this.view.render();
      });

      app.core.registerComponentCallback('before:remove', function() {
        this.view && this.view.stopListening();
      });

    },

    afterAppStart: function(app) {
      if (!historyStarted) {
        app.core.mvc.history.start();
        historyStarted = true;
      }
    }

  })
})();