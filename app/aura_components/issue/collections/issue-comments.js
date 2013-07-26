define(['underscore', 'backbone', '../models/issue-comment'], function(_, Backbone, IssueCommentModel) {
  return Backbone.Collection.extend({
    model: IssueCommentModel,
    initialize: function(models, options) {
      this.url = options.issue.url() + "/comments";
    },
    userLogins: function() {
      return _.uniq(this.map(function(comment) {
        return comment.userLogin();
      }));
    }
  });
});