import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/16/2017.
 */
export function getContentListOfPlaylist(playlistId, versionId):Promise<any>{
  let data = {
    service: 'PremiumPlaylistService.getContentListOfPlaylist',
    playlistId:playlistId,
    versionId:versionId
  };

  return myPost(data).then(function (result:any) {
    return result.response.responseClass[0].resultList[0].Content
  })
}