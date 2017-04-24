"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as querystring from 'querystring';
// import {error} from "util";
var getAllDevices_1 = require("./api/getAllDevices");
var getDevicePlayingContent_1 = require("./apiSamsung/getDevicePlayingContent");
var getDeviceThumbnail_1 = require("./apiSamsung/getDeviceThumbnail");
var getPlayingContent_1 = require("./api/getPlayingContent");
var getDeviceConnection_1 = require("./apiSamsung/getDeviceConnection");
var getOrganizationList_1 = require("./apiSamsung/getOrganizationList");
var getPlayingContentInfo_1 = require("./api/getPlayingContentInfo");
/**
 * Created by Vlad on 4/15/2017.
 */
function initApi(app) {
    //app.get('/api/getAuthToken', getToken);
    app.get('/api/getDevices/:groupId', function (req, resp) {
        var groupId = req.params.gorupId;
        getAllDevices_1.getAllDevices(groupId, req, resp);
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
