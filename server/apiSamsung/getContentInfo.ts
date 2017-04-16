import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/16/2017.
 */
export function getContentInfo(contentId):Promise<ContentInfo>{
  let data = {
    service: 'CommonContentService.getContentInfo',
    contentId: contentId
  };

  return myPost(data).then(function (result:any) {
    console.log(result);
    let inf = {
        media_type:result.response.responseClass[0].media_type[0],
        media:result.response.responseClass[0]
    }
    return inf;

  }).catch(function (error) {

    console.log(error);
    return error;

  })
}

export interface ContentInfo{
    media_type:string;
  media:any;
}