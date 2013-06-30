define(['components/aura/lib/aura'], function(Aura) {
  Aura({ debug: { enable: true } })
    .use('extensions/aura-backbone')
    .use('extensions/backbone-github-issues')
    .start({
      widgets: 'body'
    }).then(function() {
      console.warn('Aura started...');
    });
});