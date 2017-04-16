
import * as express from "express";
import * as bodyParser from "body-parser";
import {getToken} from "./server/com/getToken";
import {initApi} from "./server/initApi";
// let express = require('express');
let querystring = require('querystring');
let http = require('http');
let fs = require('fs');
let app = express();

let parseString = require('xml2js').parseString;
let path = require('path');

const port: number = 5000;

const PLAYERS = require('./server/models/devices');
console.log('PLAYERS', PLAYERS);

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api",getToken);
initApi(app);

app.listen(port, function () {

  console.log('app listening on port ' + port + '! http://localhost:' + port + '/');
});