"use strict";
exports.__esModule = true;
// import * as querystring from 'querystring';
// import {error} from "util";
var getAllDevices_1 = require("./api/getAllDevices");
var getDevicePlayingContent_1 = require("./apiSamsung/getDevicePlayingContent");
var getDeviceThumbnail_1 = require("./apiSamsung/getDeviceThumbnail");
var getPlayingContent_1 = require("./api/getPlayingContent");
var getDeviceConnection_1 = require("./apiSamsung/getDeviceConnection");
var getOrganizationList_1 = require("./apiSamsung/getOrganizationList");
var getPlayingContentInfo_1 = require("./api/getPlayingContentInfo");
var fs = require("fs");
/**
 * Created by Vlad on 4/15/2017.
 */
var offline;
function readFile(filename, resp) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err)
            throw err;
        resp.send(JSON.parse(data));
        console.log(data);
    });
}
function writeFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data), function (err) {
        if (err)
            throw err;
        console.log('The file has been saved!');
    });
}
function initApi(app) {
    //app.get('/api/getAuthToken', getToken);
    app.get('/api/getDevices/:groupId', function (req, resp) {
        var groupId = req.params.groupId;
        var filename = 'getDevices_' + groupId + '.json';
        // if(offline){
        //   readFile(filename,resp);
        //   return;
        // }
        getAllDevices_1.getAllDevices(groupId).then(function (res) {
            resp.send(res);
            writeFile(filename, res);
        })["catch"](function (error) {
            resp.send(error);
        });
    });
    app.get('/api/getDeviceConnection/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getDeviceConnection_1.getDeviceConnection(deviceId).then(function (res) {
            // console.log('getDeviceConnection', res);
            resp.send(res);
        });
    });
    app.get('/api/getPlayingContent/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getPlayingContent_1.getPlayingContent(deviceId, req, resp);
    });
    app.get('/api/getDeviceThumbnailURL/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getDeviceThumbnail_1.getDeviceThumbnail(deviceId).then(function (res) {
            // console.log('getDeviceThumbnail', res);
            resp.send(res);
        });
    });
    app.get('/api/getDevicePlayingContent/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getDevicePlayingContent_1.getDevicePlayingContent(deviceId).then(function (res) {
            // console.log('getDeviceThumbnail', res);
            resp.send(res);
        });
    });
    app.get('/api/getOrganizationList', function (req, resp) {
        getOrganizationList_1.getOrganizationList().then(function (res) {
            resp.send(res);
        });
    });
    app.get('/api/getPlayingContentInfo/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getPlayingContentInfo_1.getPlayingContentInfo(deviceId, req, resp);
    });
}
exports.initApi = initApi;
//# sourceMappingURL=initApi.js.map