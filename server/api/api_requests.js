/// <reference path="../../typings/express/express.d.ts" />
/// <reference path="../../typings/body-parser/body-parser.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// let express = require('express');
var http = require('http');
var app = express();
var parseString = require('xml2js').parseString;
var path = require('path');
global.ROOT = __dirname;
global.WWW = path.resolve(ROOT + '/client/');
global.SERVER = path.resolve(ROOT + '/server/');
//authorization
var username = "admin", password = "DjGaZ8AIxTUrbJXIFH5Q";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var token = '';
var playlists, playlist_content, devices;
// app.use('libs', express.static(ROOT + '/client/libs/'));
// app.use(express.static(ROOT + '/client/libs/'));
app.use(express.static(WWW));
var getToken = function (req, res, next) {
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/getAuthToken',
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            // 'Content-Length': Buffer.byteLength(data),
            "Authorization": auth,
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            // console.log("body: " + chunk);
        });
        response.on('end', function () {
            // res.send(rawData);
            // console.log('end', rawData);
            parseString(rawData, function (err, result) {
                token = result.response.responseClass[0]._;
                // console.log('parseString', result.response.responseClass[0]._);
                next();
            });
        }).on('error', function (err) {
            console.error(err);
        });
    });
    // console.log('getTokenFunc');
    http_req.end();
};
app.use(getToken);
app.use('/api', require('./server/api/api_requests'));
// app.get('/', function (req, res, next) {
// //getAuthToken
// //   var options = {
// //     host: '34.196.180.158',
// //     port: 7001,
// //     path: '/MagicInfo/openapi/getAuthToken',
// //     method: 'GET',
// //     headers: {
// //       'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// //       'Accept-Encoding':'gzip, deflate, sdch',
// //       'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
// //       'Connection':'keep-alive',
// //       'Upgrade-Insecure-Requests':1,
// //       // 'Content-Length': Buffer.byteLength(data),
// //       "Authorization" : auth,
// //       'User-Agent':'Mozilla/5.0'
// //     }
// //   };
// //
// //   var http_req = http.request(options, function(response) {
// //     response.setEncoding('utf8');
// //     let rawData = '';
// //     response.on('data', function (chunk) {
// //       rawData += chunk;
// //       console.log("body: " + chunk);
// //     });
// //     response.on('end', function() {
// //       res.send(rawData);
// //       console.log('end', rawData);
// //       parseString(rawData, function (err, result) {
// //         token = result.response.responseClass[0]._;
// //         console.log('parseString', result.response.responseClass[0]._);
// //       });
// //     }).on('error', function(err) {
// //       console.error(err);
// //     });
// //   });
// //
// //   http_req.end();
//     console.log('token ', token);
//     res.send(token);
// });
app.get('/getAuthToken', getToken);
// app.get('/dashboard', function (req: express.Request, res: express.Response) {
//     res.sendFile('index.html',{'root':WWW});
// });
//
// app.get('/dashboard/*', function (req: express.Request, res: express.Response) {
//     res.sendFile('index.html',{'root':WWW});
// });
app.get('/getCategoryList', function (req, res) {
    var data = querystring.stringify({
        // _csrf:'b3862bdd-115d-4f28-b182-50dfe001e3f5',
        service: 'CommonContentService.getCategoryList',
        token: token,
        groupId: ''
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            console.log("body: " + chunk);
        });
        response.on('end', function () {
            res.send(rawData);
            console.log('rawData', rawData);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/addContent', function (req, res) {
    var data = querystring.stringify({
        // _csrf:'b3862bdd-115d-4f28-b182-50dfe001e3f5',
        service: 'CommonContentService.addContent',
        token: token,
        isSecure: false,
        locale: 'en_US'
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            console.log("body: " + chunk);
        });
        response.on('end', function () {
            res.send(rawData);
            console.log('rawData', rawData);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/downloadContent', function (req, res) {
    var data = querystring.stringify({
        // _csrf:'b3862bdd-115d-4f28-b182-50dfe001e3f5',
        service: 'CommonContentService.downloadContent',
        token: token,
        contentIdList: '',
        isSecure: false,
        locale: 'en_US'
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            console.log("body: " + chunk);
        });
        response.on('end', function () {
            res.send(rawData);
            console.log('rawData', rawData);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/getPlaylistListByUser', function (req, res) {
    // console.log('TOKEN ', token);
    var data = querystring.stringify({
        service: 'PremiumPlaylistService.getPlaylistListByUser',
        token: token,
        userId: username
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            // console.log("body: " + chunk);
        });
        response.on('end', function () {
            parseString(rawData, function (err, result) {
                playlists = result.response.responseClass[0].resultList[0].Playlist;
                res.send(playlists);
                // console.log('parseString', result.response.responseClass[0].resultList[0].Playlist);
            });
            // console.log('rawData', rawData);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/getContentListOfPlaylist', function (req, res) {
    // console.log('getContentListOfPlaylist ', req);
    // console.log('req.query ', req.query.playlistId);
    // console.log('req.query ', req.query.versionId);
    var data = querystring.stringify({
        service: 'PremiumPlaylistService.getContentListOfPlaylist',
        token: token,
        playlistId: req.query.playlistId,
        versionId: req.query.versionId
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            // console.log("body: " + chunk);
        });
        response.on('end', function () {
            parseString(rawData, function (err, result) {
                playlist_content = result.response.responseClass[0].resultList[0].Content;
                res.send(playlist_content);
                // console.log('parseString', result.response.responseClass[0].resultList[0].Playlist);
            });
            // console.log('rawData', rawData);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/getDeviceListWithDeviceType', function (req, res) {
    // console.log('getContentListOfPlaylist ', req);
    // console.log('req.query ', req.query.playlistId);
    // console.log('req.query ', req.query.versionId);
    var data = querystring.stringify({
        service: 'PremiumDeviceService.getDeviceListWithDeviceType',
        token: token,
        condition: "<DeviceCondition><statusViewMode>device_status_view_connection</statusViewMode></DeviceCondition>",
        deviceType: 'ALL'
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            // console.log("body: " + chunk);
        });
        response.on('end', function () {
            parseString(rawData, function (err, result) {
                devices = result.response.responseClass[0].resultList[0].Device;
                res.send(devices);
                // console.log('parseString', result.response.responseClass[0].resultList[0].Playlist);
            });
            console.log('rawData', devices);
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.get('/getDevicePlayingContent', function (req, res) {
    // console.log('getContentListOfPlaylist ', req);
    // console.log('req.query ', req.query.playlistId);
    // console.log('req.query ', req.query.versionId);
    var data = querystring.stringify({
        service: 'PremiumDeviceService.getDevicePlayingContent',
        token: token,
        deviceId: req.query.deviceId
    });
    var options = {
        host: '34.196.180.158',
        port: 7001,
        path: '/MagicInfo/openapi/open',
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
            'User-Agent': 'Mozilla/5.0'
        }
    };
    var http_req = http.request(options, function (response) {
        response.setEncoding('utf8');
        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
            // console.log("body: " + chunk);
        });
        response.on('end', function () {
            console.log('rawData', rawData);
            parseString(rawData, function (err, result) {
                res.send(result.response.responseClass[0]);
                // console.log('parseString', result.response.responseClass[0].resultList[0].Playlist);
                console.log('rawData', result.response.responseClass[0]);
            });
        }).on('error', function (err) {
            console.error(err);
        });
    });
    http_req.write(data);
    http_req.end();
});
app.listen(5000, function () {
    console.log('app listening on port 5000! http://localhost:5000/');
});
//# sourceMappingURL=api_requests.js.map