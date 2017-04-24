"use strict";
exports.__esModule = true;
var myPost_1 = require("../com/myPost");
function getOrganizationList() {
    var data = {
        service: 'CommonUserService.getOrganizationList'
    };
    return myPost_1.myPost(data).then(function (result) {
        // console.log(result);
        return result.response.responseClass[0].resultList[0].UserGroup;
    })["catch"](function (error) {
        console.log(error);
        return error;
    });
}
exports.getOrganizationList = getOrganizationList;
//# sourceMappingURL=getOrganizationList.js.map