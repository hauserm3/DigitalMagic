import {getDeviceListWithDeviceType} from "../apiSamsung/getDeviceListWithDeviceType";

export function getAllDevices(groupId, req, resp){
  getDeviceListWithDeviceType(groupId, req, resp).then(function (res) {
    resp.send(res);
  }).catch(function (error) {
    resp.send(error);
  });
}