/**
 * Created by админ on 17.04.2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getContentScheduleList_1 = require("../apiSamsung/getContentScheduleList");
var getContentInfo_1 = require("../apiSamsung/getContentInfo");
var getDevicePlayingContent_1 = require("../apiSamsung/getDevicePlayingContent");
var getContentListOfPlaylist_1 = require("../apiSamsung/getContentListOfPlaylist");
var getPlaylistActiveVerInfo_1 = require("../apiSamsung/getPlaylistActiveVerInfo");
function getPlayingContent(deviceId, req, resp) {
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
        // console.log(devicePlayingContent);
        // resp.send(devicePlayingContent);
    }).catch(function (error) {
        resp.send(error);
    });
}
exports.getPlayingContent = getPlayingContent;
