var fs = require('fs'),
server = require('./server');

function sendInterface(response) {
  console.log("Chamando interface.");
  response.writeHead(200, {"Content-Type": "text/html"});
  var html = fs.readFileSync(__dirname + "/pages/interface.html")
  response.end(html);
}

exports.sendInterface = sendInterface;