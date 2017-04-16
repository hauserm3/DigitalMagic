"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/15/2017.
 */
function getDevicePlayingContent(deviceId) {
    var payload = {
        service: 'PremiumDeviceService.getDevicePlayingContent',
        deviceId: deviceId
    };
    return myPost_1.myPost(payload).then(function (result) {
        var data = result.response.responseClass[0];
        var content = {
            contentId: data.contentLists[0].ContentList[0].contentId[0],
            data: data,
            programId: data.programId[0],
            frameIndex: data.contentLists[0].ContentList[0].frameIndex[0]
        };
        console.log(content);
        return content;
    });
}
exports.getDevicePlayingContent = getDevicePlayingContent;
//# sourceMappingURL=getDevicePlayingContent.js.map