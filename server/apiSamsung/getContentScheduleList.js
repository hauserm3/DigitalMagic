"use strict";
exports.__esModule = true;
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/16/2017.
 */
function getContentScheduleList(programId, frameIndex) {
    var data = {
        service: 'PremiumScheduleService.getContentScheduleList',
        programId: programId,
        frameIndex: frameIndex,
        ScheduleCondition: '<ScheduleCondition><pageSize>10</pageSize><startPos>1</startPos></ScheduleCondition>'
    };
    return myPost_1.myPost(data).then(function (res) {
        var data = {
            data: res.response.responseClass[0],
            list: res.response.responseClass[0].resultList[0],
            playlistId: res.response.responseClass[0].resultList[0].ContentsScheduleEntity[0].content_id[0]
        };
        return data;
    });
}
exports.getContentScheduleList = getContentScheduleList;
//# sourceMappingURL=getContentScheduleList.js.map