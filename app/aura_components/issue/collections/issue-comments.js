define(['backbone', '../models/issue-comment'], function(Backbone, IssueCommentModel) {
  return Backbone.Collection.extend({
    model: IssueCommentModel,
    initialize: function(models, options) {
      this.url = options.issue.url() + "/comments";
    }
  });
});