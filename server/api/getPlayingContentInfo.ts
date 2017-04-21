import {getDevicePlayingContent} from "../apiSamsung/getDevicePlayingContent";
import {getContentInfo, ContentInfo} from "../apiSamsung/getContentInfo";

export function getPlayingContentInfo(deviceId, req, resp){
  getDevicePlayingContent(deviceId).then(function (devicePlayingContent) {
    getContentInfo(devicePlayingContent.contentId).then(function (contentInfo: ContentInfo) {
        resp.send(contentInfo.media);
    });
    // console.log(devicePlayingContent);
    // resp.send(devicePlayingContent);
  }).catch(function (error) {
    resp.send(error)
  });
}