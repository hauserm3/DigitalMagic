import {myPost} from "../com/myPost";
/**
 * Created by Vlad on 4/16/2017.
 */
export function getContentScheduleList( programId, frameIndex){

  let data = {
    service: 'PremiumScheduleService.getContentScheduleList',
    programId:programId,
    frameIndex:frameIndex,
    ScheduleCondition: '<ScheduleCondition><pageSize>10</pageSize><startPos>1</startPos></ScheduleCondition>'
  }
  return myPost(data).then(function (res:any) {
    return res.response.responseClass[0].resultList[0].ContentsScheduleEntity[0].content_id[0]
  })

}