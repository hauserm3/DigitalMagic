"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var getToken_1 = require("./server/com/getToken");
var initApi_1 = require("./server/initApi");
// let express = require('express');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var app = express();
var parseString = require('xml2js').parseString;
var path = require('path');
var port = 5000;
var PLAYERS = require('./server/models/devices');
console.log('PLAYERS', PLAYERS);
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", getToken_1.getToken);
initApi_1.initApi(app);
app.listen(port, function () {
    console.log('app listening on port ' + port + '! http://localhost:' + port + '/');
});
//# sourceMappingURL=server.js.map