import {myPost} from "../com/myPost";

export function getDeviceConnection(deviceId: string): Promise<any>{
  let payload = {
    service: 'PremiumDeviceService.getDeviceConnection',
    deviceId: deviceId
  };
  // console.log('conection deviceId', deviceId);

  return myPost(payload).then(function (result: any) {
    let deviceConnectionEntity = result.response.responseClass[0]._;
    // console.log('deviceConnectionEntity ', deviceConnectionEntity);
    return deviceConnectionEntity;
  }).catch(function(error){
    return error;
  });
}