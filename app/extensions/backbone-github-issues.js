define(['models/issue', 'collections/issues'], function(IssueModel, IssuesCollection) {
  
  return {
    initialize: function(app) {

      app.sandbox.mvc = {
        collections: { Issues:  IssuesCollection },
        models:      { Issue:   IssueModel }
      };

      var sandboxId = 'issues-list';
      var issues = app.createSandbox('issues-list', { el: $('#issues') });

      function getIssueId(issue) {
        return [issue.repo.replace('/', '-'), issue.number].join('-');
      }

      issues.on('issues.add', function(issue, reset) {
        var el = $('<div />').addClass('span6');
        el.html('loading... ');
        issues.el.append(el);
        issue.el = el;
        var widget = { name: 'issue', options: issue };
        issues.start([ widget ], { reset: reset });
      });

      issues.on('issues.remove', function(issue) {
        var selector = "[data-issue='" + getIssueId(issue) + "']";
        issues.stop(selector);
      });


    }
  }

});