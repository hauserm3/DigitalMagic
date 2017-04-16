import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/15/2017.
 */
export function getAllDevices(req,response): Promise<any>{
  let payload  = {
    service:'PremiumDeviceService.getDeviceListWithDeviceType',
    condition: '<DeviceCondition><statusViewMode>device_status_view_all</statusViewMode></DeviceCondition>',
    deviceType:'ALL'
  };

  return myPost(payload).then(function (res:any) {
    //console.log(res);
    let out:any = {};
    out.devices = res.response.responseClass[0].resultList[0].Device;
    response.send(out);
  }).catch(function (err) {
    console.log(err);
    response.send(err)
  })
}