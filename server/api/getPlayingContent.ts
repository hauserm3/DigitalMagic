/**
 * Created by админ on 17.04.2017.
 */

import {getContentScheduleList, ScheduleList} from "../apiSamsung/getContentScheduleList";

import {getContentInfo, ContentInfo} from "../apiSamsung/getContentInfo";

import {getDevicePlayingContent} from "../apiSamsung/getDevicePlayingContent";
import {getContentListOfPlaylist} from "../apiSamsung/getContentListOfPlaylist";
import {getPlaylistActiveVerInfo, PlaylistActiveVerInfo} from "../apiSamsung/getPlaylistActiveVerInfo";

export function getPlayingContent(deviceId, req, resp){
  getDevicePlayingContent(deviceId).then(function (devicePlayingContent) {
    getContentInfo(devicePlayingContent.contentId).then(function (contentInfo: ContentInfo) {
      if(contentInfo.media_type == 'MOVIE') {
        resp.send(contentInfo.media);
      } else {
        getContentScheduleList(devicePlayingContent.programId, devicePlayingContent.frameIndex)
          .then(function (scheduleList: ScheduleList) {
            getPlaylistActiveVerInfo(scheduleList.playlistId)
              .then(function (playlistActiveVerInfo: PlaylistActiveVerInfo) {
                getContentListOfPlaylist(playlistActiveVerInfo.playlistId, playlistActiveVerInfo.versionId)
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
    resp.send(error)
  });
}