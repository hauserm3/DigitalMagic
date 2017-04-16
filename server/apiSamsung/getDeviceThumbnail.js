"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/16/2017.
 */
function getDeviceThumbnail(deviceId) {
    var data = {
        service: 'PremiumDeviceService.getDeviceThumbnailURL',
        device_id: deviceId
    };
    return myPost_1.myPost(data).then(function (result) {
        return result.response.responseClass[0]._;
    });
}
exports.getDeviceThumbnail = getDeviceThumbnail;
//# sourceMappingURL=getDeviceThumbnail.js.map