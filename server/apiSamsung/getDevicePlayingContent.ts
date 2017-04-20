import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/15/2017.
 */


export function getDevicePlayingContent(deviceId: number): Promise<DevicePlayingContent> {
  let payload = {
    service: 'PremiumDeviceService.getDevicePlayingContent',
    deviceId: deviceId
  };

  return myPost(payload).then(function (result: any) {

    let data = result.response.responseClass[0];
    let content: DevicePlayingContent = {
      contentId: data.contentLists[0].ContentList[0].contentId[0],
      data: data,
      programId: data.programId[0],
      frameIndex: data.contentLists[0].ContentList[0].frameIndex[0]
    };

    // console.log(content);
    return content
  });

}


export interface DevicePlayingContent {
  contentId: string;
  data: any;
  programId: string;
  frameIndex: string;
}
