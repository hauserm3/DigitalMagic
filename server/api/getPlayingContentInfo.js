"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDevicePlayingContent_1 = require("../apiSamsung/getDevicePlayingContent");
var getContentInfo_1 = require("../apiSamsung/getContentInfo");
function getPlayingContentInfo(deviceId, req, resp) {
    getDevicePlayingContent_1.getDevicePlayingContent(deviceId).then(function (devicePlayingContent) {
        getContentInfo_1.getContentInfo(devicePlayingContent.contentId).then(function (contentInfo) {
            resp.send(contentInfo.media);
        });
        // console.log(devicePlayingContent);
        // resp.send(devicePlayingContent);
    }).catch(function (error) {
        resp.send(error);
    });
}
exports.getPlayingContentInfo = getPlayingContentInfo;
