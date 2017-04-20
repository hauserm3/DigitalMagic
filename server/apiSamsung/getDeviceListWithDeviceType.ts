import {myPost} from "../com/myPost";

export function getDeviceListWithDeviceType(groupId, req,response): Promise<any>{
  let payload  = {
    service:'PremiumDeviceService.getDeviceListWithDeviceType',
    condition: '<DeviceCondition><statusViewMode>device_status_view_all</statusViewMode></DeviceCondition>',
    deviceType:'ALL'
  };

  return myPost(payload).then(function (res:any) {
    //console.log(res);
    let out:any = {};
    out.devices = res.response.responseClass[0].resultList[0].Device;
    // console.log('getAllDevices');
    return out;
  }).catch(function (err) {
    console.log(err);
    return err;
  });
}