import {token} from "./com/getToken";
 import * as querystring from 'querystring';
import {myPost} from "./com/myPost";
import {error} from "util";
import {getAllDevices} from "./api/getAllDevices";
import {getDevicePlayingContent} from "./api/getDevicePlayingContent";
import {getDeviceThumbnail} from "./api/getDeviceThumbnail";
import {ContentInfo, getContentInfo} from "./api/getContentInfo";
import {getContentScheduleList, ScheduleList} from "./api/getContentScheduleList";
import {getPlaylistActiveVerInfo, PlaylistActiveVerInfo} from "./api/getPlaylistActiveVerInfo";
import {getContentListOfPlaylist} from "./api/getContentListOfPlaylist";
/**
 * Created by Vlad on 4/15/2017.
 */

export function initApi(app){
  //app.get('/api/getAuthToken', getToken);

  app.get('/api/getDevices/:groupId', function (req, res) {
    let groupId = req.params.gorupId;
    getAllDevices(req,res);
  });


  app.get('/api/getPlayingContent/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;

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

      console.log(devicePlayingContent);

      resp.send(devicePlayingContent);
    }).catch(function (error) {
      resp.send(error)
    });


  });

  app.get('/api/getDeviceThumbnailURL/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;

    getDeviceThumbnail(deviceId).then(function (res) {
      resp.send(res);
    }).catch(function(error){
      resp.send(error)
    })

  })
  app.get('/api/getCategoryList', function (req, res) {
    let service:'CommonContentService.getCategoryList';

  });

  app.get('/api/addContent', function (req, res) {

  });

  app.get('/api/downloadContent', function (req, res) {


  });

  app.get('/api/getPlaylistListByUser', function (req, res) {
    // console.log('TOKEN ', token);

    let result
    // playlists = result.response.responseClass[0].resultList[0].Playlist;
    // res.send(playlists);

  });

  app.get('/api/getContentListOfPlaylist', function (req, res) {

    let result
    // playlist_content = result.response.responseClass[0].resultList[0].Content;
    // res.send(playlist_content);

  });
////////////////// DEVICES START ///////////////////

}