import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/15/2017.
 */


export function getPlayingContent(deviceId:number):Promise<DevicePlayingContent>{
  let payload = {
    service: 'PremiumDeviceService.getDevicePlayingContent',
    deviceId: deviceId
  };

  return myPost(payload).map(function (result:any) {


    let content = {
      contentId:result.response.responseClass[0].contentLists[0].ContentList[0].contentId[0],
      data:result.response.responseClass[0]
    };

    console.log(content);
    return content
  });

}


export interface DevicePlayingContent{
  contentId:string;
  data:any;
}
