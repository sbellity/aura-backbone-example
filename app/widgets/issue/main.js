define(['text!./issue.html'], function(template) {
  return {

    className: 'span6',

    events: {
      'click .close' : function() {
        this.sandbox.stop();
      }
    },

    initialize: function() {
      var issue = new this.sandbox.mvc.models.Issue({ 
        repo:   this.options.repo, 
        number: this.options.number 
      });
      this.view.listenTo(issue, 'sync', _.bind(this.render, this));
      this.view.listenTo(issue, 'error', _.bind(function() { this.render(issue, 'error'); }, this));
      issue.fetch();
    },

    render: function(issue, error) {
      var issueData = {};
      this.template = this.template || _.template(template);
      if (error === 'error') {
        issueData.error   = "Error retrieving issue #" + this.options.number;
      } else {
        issueData = issue.toJSON()
        issueData.summary = issue.getSummary();
      }
      this.$el.html(this.template({ issue: issueData, repo: this.options.repo }));
      var issueId = [issue.get('repo').replace('/', '-'), issue.get('number')].join('-');
      this.$el.attr('data-issue', issueId);
    }

  }
});