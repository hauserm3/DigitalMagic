"use strict";
exports.__esModule = true;
var myPost_1 = require("../com/myPost");
function getDeviceListWithDeviceType(groupId) {
    var payload = {
        service: 'PremiumDeviceService.getDeviceListWithDeviceType',
        condition: '<DeviceCondition><statusViewMode>device_status_view_all</statusViewMode></DeviceCondition>',
        deviceType: 'ALL'
    };
    return myPost_1.myPost(payload).then(function (res) {
        console.log(res);
        var out = {};
        out.devices = res.response.responseClass[0].resultList[0].Device;
        console.log('getAllDevices', out.devices);
        return out;
    })["catch"](function (err) {
        console.log('getDeviceListWithDeviceType error', err);
        return err;
    });
}
exports.getDeviceListWithDeviceType = getDeviceListWithDeviceType;
//# sourceMappingURL=getDeviceListWithDeviceType.js.map