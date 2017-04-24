"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/16/2017.
 */
function getContentInfo(contentId) {
    var data = {
        service: 'CommonContentService.getContentInfo',
        contentId: contentId
    };
    return myPost_1.myPost(data).then(function (result) {
        // console.log(result);
        var inf = {
            media_type: result.response.responseClass[0].media_type[0],
            media: result.response.responseClass[0]
        };
        return inf;
    }).catch(function (error) {
        console.log(error);
        return error;
    });
}
exports.getContentInfo = getContentInfo;
