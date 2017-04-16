import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/16/2017.
 */
export function getPlaylistActiveVerInfo(playlistId):Promise<PlaylistActiveVerInfo>{
  let data = {
    service: 'PremiumPlaylistService.getPlaylistActiveVerInfo',
    playlistId: playlistId
  };

  return myPost(data).then(function (result:any) {
    console.log(result);
    let out: PlaylistActiveVerInfo = {
      playlistId: result.response.responseClass[0].playlist_id[0],
      versionId: result.response.responseClass[0].version_id[0]
    }
    return out;

  }).catch(function (error) {

    console.log(error);
    return error;

  })
}

export interface PlaylistActiveVerInfo{
  playlistId:string;
  versionId:any;
}