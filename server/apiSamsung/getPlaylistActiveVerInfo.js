"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPost_1 = require("../com/myPost");
/**
 * Created by Vlad on 4/16/2017.
 */
function getPlaylistActiveVerInfo(playlistId) {
    var data = {
        service: 'PremiumPlaylistService.getPlaylistActiveVerInfo',
        playlistId: playlistId
    };
    return myPost_1.myPost(data).then(function (result) {
        // console.log(result);
        var out = {
            playlistId: result.response.responseClass[0].playlist_id[0],
            versionId: result.response.responseClass[0].version_id[0]
        };
        return out;
    }).catch(function (error) {
        console.log(error);
        return error;
    });
}
exports.getPlaylistActiveVerInfo = getPlaylistActiveVerInfo;
