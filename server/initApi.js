"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllDevices_1 = require("./api/getAllDevices");
var getPlayingContent_1 = require("./api/getPlayingContent");
var getDeviceThumbnail_1 = require("./api/getDeviceThumbnail");
/**
 * Created by Vlad on 4/15/2017.
 */
function initApi(app) {
    //app.get('/api/getAuthToken', getToken);
    app.get('/api/getDevices/:groupId', function (req, res) {
        var groupId = req.params.gorupId;
        getAllDevices_1.getAllDevices(req, res);
    });
    app.get('/api/getPlayingContent/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getPlayingContent_1.getPlayingContent(deviceId).then(function (devicePlayingContent) {
            console.log(devicePlayingContent);
            resp.send(res);
        }).catch(function (error) {
            resp.send(error);
        });
    });
    app.get('/api/getDeviceThumbnailURL/:deviceId', function (req, resp) {
        var deviceId = req.params.deviceId;
        getDeviceThumbnail_1.getDeviceThumbnail(deviceId).then(function (res) {
            resp.send(res);
        }).catch(function (error) {
            resp.send(error);
        });
    });
    app.get('/api/getCategoryList', function (req, res) {
        var service;
    });
    app.get('/api/addContent', function (req, res) {
    });
    app.get('/api/downloadContent', function (req, res) {
    });
    app.get('/api/getPlaylistListByUser', function (req, res) {
        // console.log('TOKEN ', token);
        var result;
        // playlists = result.response.responseClass[0].resultList[0].Playlist;
        // res.send(playlists);
    });
    app.get('/api/getContentListOfPlaylist', function (req, res) {
        var result;
        // playlist_content = result.response.responseClass[0].resultList[0].Content;
        // res.send(playlist_content);
    });
    ////////////////// DEVICES START ///////////////////
}
exports.initApi = initApi;
//# sourceMappingURL=initApi.js.map