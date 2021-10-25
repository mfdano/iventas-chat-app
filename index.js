var static = require('node-static');
var http = require('http');
var path = require('path')

var file = new(static.Server)(path.join(__dirname, '', 'build'));

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(process.env.PORT || 3000);