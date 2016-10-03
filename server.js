var express = require("express");
var parser = require("ua-parser");
var app = express();
// the response json. initially empty.
var result = {};
app.get("/", function(req, res) {
	// returns ip address of the client.
	result.ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
         req.socket.remoteAddress || req.connection.socket.remoteAddress;
    // The following three lines extract os information from the parsed request header.
    var parsedUA = parser.parse(req.headers["user-agent"]);
    var os = parsedUA.string;
	result.os = os.slice(os.indexOf("(") + 1, os.indexOf(")"));
    // Send response json.
    res.send(result);
    res.end();
});

var port = Number(process.env.PORT || 3000)
app.listen(port);