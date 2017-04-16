import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/16/2017.
 */
export function getDeviceThumbnail(deviceId):Promise<any>{
  let data ={
      service: 'PremiumDeviceService.getDeviceThumbnailURL',
      device_id:deviceId
    };

  return myPost(data).then(function (result:any) {
    return result.response.responseClass[0]._
  })

}