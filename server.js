var express = require("express");
var parser = require("ua-parser");
var app = express();
// the response json. initially empty.
var result = {};
app.get("/", function(req, res) {
	// returns ip address of the client.
	result.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
         req.socket.remoteAddress || req.connection.socket.remoteAddress;
    // Send response json.
    res.send(result);
    res.end();
});

var port = Number(process.env.PORT || 3000)
app.listen(port);