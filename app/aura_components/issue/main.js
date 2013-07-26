define(['./collections/issue-comments'], function(IssueCommentsCollection) {
  return {
    templates: ['issue'],

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
      var comments = new IssueCommentsCollection([], { issue: issue });
      this.data = { issue: issue, comments: comments };
      this.view.listenTo(issue,     'sync', _.bind(this.render, this));
      this.view.listenTo(comments,  'sync', _.bind(this.render, this));
      this.view.listenTo(issue, 'error', _.bind(function() { this.render(this.data, 'error'); }, this));
      issue.fetch().then(function() {
        comments.fetch();
      });
    },

    render: function(data, error) {
      var context = { repo: this.options.repo };

      if (error === 'error') {
        context.issue = { error: "Error retrieving issue #" + this.options.number };
      } else {
        context.issue       = this.data.issue.toJSON();
        context.summary     = this.data.issue.getSummary();
        context.comments    = this.data.comments.toJSON()
        context.commenters  = this.data.comments.userLogins();
      }
      this.html(this.renderTemplate('issue', context));
      var issueId = [this.data.issue.get('repo'), this.data.issue.get('number')].join('/');
      this.$el.attr('data-issue', issueId);
    }
  }
});