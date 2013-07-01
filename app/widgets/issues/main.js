define(['text!./issues.html'], function(template) {

  function getIssueId(issue) {
    return [issue.repo.replace('/', '-'), issue.number].join('-');
  }

  return {
    
    initialize: function() {

      this.sandbox.on('issues.add', function(issue, reset) {
        var el = $('<div />').addClass('span6').html("loading...");
        this.dom.find('.issues-list', this.el).append(el);
        // 'this' here is the widget's sandbox
        this.start([ { name: 'issue', options: _.extend(issue, { el: el }) } ], { reset: reset });
      });

      this.sandbox.on('issues.remove', function(issue) {
        var selector = "[data-issue='" + getIssueId(issue) + "']";
        // 'this' here is the widget's sandbox
        this.stop(selector);
      });

      this.render();

    },

    render: function(collection) {
      this.html(template);
    }

  };
});
