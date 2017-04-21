import {token} from "./com/getToken";
import {myPost} from "./com/myPost";
// import * as querystring from 'querystring';
// import {error} from "util";
import {getAllDevices} from "./api/getAllDevices";
import {getDevicePlayingContent} from "./apiSamsung/getDevicePlayingContent";
import {getDeviceThumbnail} from "./apiSamsung/getDeviceThumbnail";
import {ContentInfo, getContentInfo} from "./apiSamsung/getContentInfo";
import {getContentScheduleList, ScheduleList} from "./apiSamsung/getContentScheduleList";
import {getPlaylistActiveVerInfo, PlaylistActiveVerInfo} from "./apiSamsung/getPlaylistActiveVerInfo";
import {getPlayingContent} from "./api/getPlayingContent";
import {getDeviceConnection} from "./apiSamsung/getDeviceConnection";
import {getOrganizationList} from "./apiSamsung/getOrganizationList";
import {getPlayingContentInfo} from "./api/getPlayingContentInfo";
/**
 * Created by Vlad on 4/15/2017.
 */

export function initApi(app) {
  //app.get('/api/getAuthToken', getToken);

  app.get('/api/getDevices/:groupId', function (req, resp) {
    let groupId = req.params.gorupId;
    getAllDevices(groupId, req, resp);
  });

  app.get('/api/getDeviceConnection/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;
    getDeviceConnection(deviceId).then(function (res) {
      // console.log('getDeviceConnection', res);
      resp.send(res);
    });
  });

  app.get('/api/getPlayingContent/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;
    getPlayingContent(deviceId, req, resp);
  });

  app.get('/api/getDeviceThumbnailURL/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;
    getDeviceThumbnail(deviceId).then(function (res) {
      // console.log('getDeviceThumbnail', res);
      resp.send(res);
    });
  });

  app.get('/api/getDevicePlayingContent/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;
    getDevicePlayingContent(deviceId).then(function (res) {
      // console.log('getDeviceThumbnail', res);
      resp.send(res);
    });
  });

  app.get('/api/getOrganizationList', function (req, resp) {
    getOrganizationList().then(function (res) {
      resp.send(res);
    });
  });

  app.get('/api/getPlayingContentInfo/:deviceId', function (req, resp) {
    let deviceId = req.params.deviceId;
    getPlayingContentInfo(deviceId, req, resp);
  });
}