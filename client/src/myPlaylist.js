///<reference path="index.d.ts"/>
var magic;
(function (magic) {
    var MyPlaylist = (function () {
        function MyPlaylist(device) {
            this.device = device;
            this.device = device;
            this.$view = $('<div>').addClass('playlist_editer_wrap');
            this.$listConteiner = $('<div>').addClass('scrolling').appendTo(this.$view);
            // this.hidePlaylist();
            this.getPlayingContent(device.device_id[0]);
        }
        MyPlaylist.prototype.showPlaylist = function () {
            this.visible = true;
            // this.$view.removeClass('hidden');
            this.$view.show('fast');
        };
        MyPlaylist.prototype.hidePlaylist = function () {
            this.visible = false;
            // this.$view.addClass('hidden');
            this.$view.hide('fast');
        };
        MyPlaylist.prototype.togglePlaylist = function () {
            if (this.visible) {
                this.hidePlaylist();
            }
            else {
                this.showPlaylist();
            }
        };
        MyPlaylist.prototype.getPlayingContent = function (deviceId) {
            // console.log('getPlayingContent');
            var _this = this;
            // let src_thumb1 = 'http://34.196.180.158:7001/MagicInfo/servlet/ContentThumbnail?thumb_id=';
            // let src_thumb2 = '&thumb_filename=';
            // let src_thumb3 = '_MEDIUM.PNG&width=100&height=56';
            var $myList = $("<ul>");
            $.get('getPlayingContent' + '?deviceId=' + deviceId).done(function (res) {
                if (res.length) {
                    console.log('ContentInfoArr', res);
                    res.forEach(function (item, i, arr) {
                        _this.setPlayingContent(item, $myList);
                        // let li = $('<li>').appendTo($myList);
                        // let div = $('<div>').appendTo(li);
                        // let img = $('<img>').attr('src',src_thumb1 + item.thumb_file_id[0] +
                        //     src_thumb2 + item.thumb_file_name[0]+
                        //     src_thumb3).appendTo(div);
                        //
                        // let p = $('<p>').addClass('name').appendTo(div);
                        // $('<span>').addClass('name text-overflow').text(item.content_name[0]).appendTo(p);
                    });
                }
                else {
                    console.log('ContentInfo', res);
                    _this.$listConteiner.removeClass('scrolling').addClass('noscrolling');
                    _this.setPlayingContent(res, $myList);
                    // let li = $('<li>').appendTo($myList);
                    // let div = $('<div>').appendTo(li);
                    // let img = $('<img>').attr('src',src_thumb1 + res.thumb_file_id[0] +
                    //     src_thumb2 + res.thumb_file_name[0]+
                    //     src_thumb3).appendTo(div);
                    //
                    // let p = $('<p>').addClass('name').appendTo(div);
                    // $('<span>').addClass('name text-overflow').text(res.content_name[0]).appendTo(p);
                }
                _this.$list = $myList;
                _this.$listConteiner.append($myList);
                // console.log('ContentInfo', res);
            }).fail(function (err) {
                console.error('error', err);
                return err;
            });
        };
        MyPlaylist.prototype.setPlayingContent = function (playingContent, myList) {
            var src_thumb1 = 'http://34.196.180.158:7001/MagicInfo/servlet/ContentThumbnail?thumb_id=';
            var src_thumb2 = '&thumb_filename=';
            var src_thumb3 = '_MEDIUM.PNG';
            // let src_thumb3 = '_MEDIUM.PNG&width=100&height=56';
            var li = $('<li>').appendTo(myList); // reference to $myList
            var div = $('<div>').appendTo(li);
            var img = $('<img>').attr('src', src_thumb1 + playingContent.thumb_file_id[0] +
                src_thumb2 + playingContent.thumb_file_name[0] +
                src_thumb3).appendTo(div);
            var p = $('<p>').addClass('name').appendTo(div);
            $('<span>').addClass('name text-overflow').text(playingContent.content_name[0]).appendTo(p);
        };
        return MyPlaylist;
    }());
    magic.MyPlaylist = MyPlaylist;
})(magic || (magic = {}));
//# sourceMappingURL=myPlaylist.js.map