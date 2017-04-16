"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/15/2017.
 */
function getPlayingContent(deviceId) {
    var payload = {
        service: 'PremiumDeviceService.getDevicePlayingContent',
        deviceId: deviceId
    };
    return myPost_1.myPost(payload).map(function (result) {
        var content = {
            contentId: result.response.responseClass[0].contentLists[0].ContentList[0].contentId[0],
            data: result.response.responseClass[0]
        };
        console.log(content);
        return content;
    });
}
exports.getPlayingContent = getPlayingContent;
//# sourceMappingURL=getPlayingContent.js.map