// express example

var express = require('express');
var fs = require('fs');
var http = require('http');
var assert = require('assert');
var whiskers = require('../../lib/whiskers');

var app;
if (express.version.charAt(0) == 2) {
  app = express.createServer();
  app.register('.html', whiskers);
} else {
  app = express();
  app.engine('.html', whiskers.__express);
}
app.set('views', __dirname+'/views');

app.get('/', function(req, res){
  if (express.version.charAt(0) == 2) {
    res.render('index.html', {title: 'My Site', content: 'Welcome!'});
  } else {
    res.render('layout.html', {
      partials: {
        body: 'index.html',
        footer: __dirname+'/views/footer.html'
      },
      title: 'My Site',
      content: 'Welcome!',
      author: '#rd Group'
    });
  }
});

var expected = fs.readFileSync(__dirname+'/rendered.html', 'utf8');

app.listen(8080, function() {
  http.get({
    host: '127.0.0.1',
    port: 8080
  }, function(res) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      assert.equal(data, expected);
      process.exit();
    });
  }).on('error', function(e) {
    throw e;
  });
});
