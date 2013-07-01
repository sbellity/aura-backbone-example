define(['text!./display-issue.html'], function(template) {

  return {
    events: {
      'click input[type="submit"]': function(e) {
        this.action = $(e.target).val();
      },

      'submit form': function(e) {
        var form = $(e.target);

        var issue = _.inject(form.serializeArray(), function(memo, input) {
          memo[input.name] = input.value;
          return memo;
        }, {});

        // Reset
        var reset = !!issue.reset;
        delete issue.reset;
       
        var eventName = 'issues.add';
        if (this.action === 'stop') {
          eventName = 'issues.remove';
        }

        if (!!issue.number) {
          this.sandbox.emit(eventName, issue, reset);
          if (this.action !== 'stop') {
            this.$el.find('input[name="number"]').val(parseInt(issue.number, 10) + 1);
          } else {
            this.$el.find('input[name="number"]').val(parseInt(issue.number, 10) - 1);
          }
        }

        e.preventDefault();
        return false;
      }
    },

    initialize: function() {
      this.repos = (this.options.repos || "aurajs/aura").split(",");
      this.render();
    },

    render: function() {
      this.template = _.template(template);
      this.$el.html(this.template({ repos: this.repos }));
      this.$el.find('input[type="text"]').focus();
    }
  };

});



//--------


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
        issueData = issue.toJSON();
        issueData.summary = issue.getSummary();
      }
      this.$el.html(this.template({ issue: issueData, repo: this.options.repo }));
      var issueId = [issue.get('repo').replace('/', '-'), issue.get('number')].join('-');
      this.$el.attr('data-issue', issueId);
    }

  };
});



//--------


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
