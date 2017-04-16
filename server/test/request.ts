/**
 * Created by админ on 07.03.2017.
 */
var querystring = require('querystring');
var http = require('http');

//authorization
let username = "admin",
    password = "NBjMiXhl3tddjyD14Iwx";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

//getAuthToken
var options = {
  host: '34.198.20.245',
  port: 7001,
  path: '/MagicInfo/openapi/getAuthToken',
  method: 'GET',
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':'gzip, deflate, sdch',
    'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
    'Connection':'keep-alive',
    'Upgrade-Insecure-Requests':1,
    // 'Content-Length': Buffer.byteLength(data),
    "Authorization" : auth,
    'User-Agent':'Mozilla/5.0'
  }
};

var http_req = http.request(options, function(response) {
  response.setEncoding('utf8');
  let rawData = '';
  response.on('data', function (chunk) {
    rawData += chunk;
    console.log("body: " + chunk);
  });
  response.on('end', function() {
    console.log('rawData', rawData);
  }).on('error', function(err) {
    console.error(err);
  });
});

// http_req.write();
http_req.end();