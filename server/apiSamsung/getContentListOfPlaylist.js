"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/16/2017.
 */
function getContentListOfPlaylist(playlistId, versionId) {
    var data = {
        service: 'PremiumPlaylistService.getContentListOfPlaylist',
        playlistId: playlistId,
        versionId: versionId
    };
    return myPost_1.myPost(data).then(function (result) {
        return result.response.responseClass[0].resultList[0].Content;
    });
}
exports.getContentListOfPlaylist = getContentListOfPlaylist;
