import {myPost} from "../com/myPost";

export function getOrganizationList(): Promise<any>{
  let data = {
    service: 'CommonUserService.getOrganizationList'
  };

  return myPost(data).then(function (result:any) {
    // console.log(result);
    return result.response.responseClass[0].resultList[0].UserGroup;
  }).catch(function (error) {
    console.log(error);
    return error;
  });
}

export interface ContentInfo{
  media_type:string;
  media:any;
}