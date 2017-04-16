"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllDevices_1 = require("./api/getAllDevices");
var getDevicePlayingContent_1 = require("./api/getDevicePlayingContent");
var getDeviceThumbnail_1 = require("./api/getDeviceThumbnail");
var getContentInfo_1 = require("./api/getContentInfo");
var getContentScheduleList_1 = require("./api/getContentScheduleList");
var getPlaylistActiveVerInfo_1 = require("./api/getPlaylistActiveVerInfo");
var getContentListOfPlaylist_1 = require("./api/getContentListOfPlaylist");
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
        getDevicePlayingContent_1.getDevicePlayingContent(deviceId).then(function (devicePlayingContent) {
            getContentInfo_1.getContentInfo(devicePlayingContent.contentId).then(function (contentInfo) {
                if (contentInfo.media_type == 'MOVIE') {
                    resp.send(contentInfo.media);
                }
                else {
                    getContentScheduleList_1.getContentScheduleList(devicePlayingContent.programId, devicePlayingContent.frameIndex)
                        .then(function (scheduleList) {
                        getPlaylistActiveVerInfo_1.getPlaylistActiveVerInfo(scheduleList.playlistId)
                            .then(function (playlistActiveVerInfo) {
                            getContentListOfPlaylist_1.getContentListOfPlaylist(playlistActiveVerInfo.playlistId, playlistActiveVerInfo.versionId)
                                .then(function (res) {
                                resp.send(res);
                            });
                        });
                    });
                }
            });
            console.log(devicePlayingContent);
            resp.send(devicePlayingContent);
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