"use strict";
exports.__esModule = true;
var myPost_1 = require("../com/myPost");
function getDeviceConnection(deviceId) {
    var payload = {
        service: 'PremiumDeviceService.getDeviceConnection',
        deviceId: deviceId
    };
    // console.log('conection deviceId', deviceId);
    return myPost_1.myPost(payload).then(function (result) {
        var deviceConnectionEntity = result.response.responseClass[0]._;
        // console.log('deviceConnectionEntity ', deviceConnectionEntity);
        return deviceConnectionEntity;
    })["catch"](function (error) {
        return error;
    });
}
exports.getDeviceConnection = getDeviceConnection;
//# sourceMappingURL=getDeviceConnection.js.map