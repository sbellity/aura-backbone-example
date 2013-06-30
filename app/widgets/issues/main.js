define(['text!./issues.html'], function(template) {
  return {
    
    options: {
      repo: 'aurajs/aura'
    },
    
    initialize: function() {
      var issues = new this.sandbox.mvc.collections.Issues([], this.options);
      this.listenTo(issues, 'sync', _.bind(this.render, this));
      issues.fetch();
    },

    render: function(collection) {
      this.template = this.template || _.template(template);
      this.html(this.template({ issues: collection.toJSON(), repo: this.options.repo }));
    },

    afterRemove: function() {
      console.warn("widget removed ", this);
    }
  };
});
