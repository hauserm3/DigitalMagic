"use strict";
exports.__esModule = true;
var getDeviceListWithDeviceType_1 = require("../apiSamsung/getDeviceListWithDeviceType");
function getAllDevices(groupId, req, resp) {
    getDeviceListWithDeviceType_1.getDeviceListWithDeviceType(groupId, req, resp).then(function (res) {
        resp.send(res);
    })["catch"](function (error) {
        resp.send(error);
    });
}
exports.getAllDevices = getAllDevices;
//# sourceMappingURL=getAllDevices.js.map