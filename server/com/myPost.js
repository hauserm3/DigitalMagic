"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseString_1 = require("./parseString");
var getToken_1 = require("./getToken");
var Promise = require("bluebird");
var querystring = require('querystring');
var http = require("http");
/**
 * Created by Vlad on 4/15/2017.
 */
function myPost(data) {
    return new Promise(function (resolve, reject) {
        if (!data.service) {
            reject('service must be in postData');
            return;
        }
        data.token = getToken_1.token;
        var payload = querystring.stringify(data);
        var options = {
            host: '34.196.180.158',
            port: 7001,
            path: '/MagicInfo/openapi/open',
            method: 'POST',
            headers: {
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(payload),
                'User-Agent': 'Mozilla/5.0'
            }
        };
        // console.log(payload);
        var http_req = http.request(options, function (response) {
            response.setEncoding('utf8');
            var rawData = '';
            response.on('data', function (chunk) {
                rawData += chunk;
                // console.log("body: " + chunk);
            });
            response.on('end', function () {
                parseString_1.parseString(rawData, function (err, result) {
                    resolve(result);
                });
                // console.log('rawData', rawData);
            }).on('error', function (err) {
                reject(err);
                console.error('error myPost ', err);
            });
        });
        http_req.on('error', function (err) {
            console.error('error myPost ', err);
        });
        http_req.write(payload);
        http_req.end();
    });
}
exports.myPost = myPost;
