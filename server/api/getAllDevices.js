"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/15/2017.
 */
function getAllDevices(req, response) {
    var payload = {
        service: 'PremiumDeviceService.getDeviceListWithDeviceType',
        condition: '<DeviceCondition><statusViewMode>device_status_view_all</statusViewMode></DeviceCondition>',
        deviceType: 'ALL'
    };
    return myPost_1.myPost(payload).then(function (res) {
        //console.log(res);
        var out = {};
        out.devices = res.response.responseClass[0].resultList[0].Device;
        response.send(out);
    }).catch(function (err) {
        console.log(err);
        response.send(err);
    });
}
exports.getAllDevices = getAllDevices;
//# sourceMappingURL=getAllDevices.js.map