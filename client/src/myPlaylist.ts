
export class MyPlaylist{
        visible: boolean;
        $view: JQuery;
        $list: JQuery;
        $listConteiner: JQuery;

        constructor(private device: any){
            this.device = device;
            this.$view = $('<div>').addClass('playlist_editer_wrap text-center');
            this.$listConteiner = $('<div>').addClass('scrolling').appendTo(this.$view);
            // this.hidePlaylist();
            this.getPlayingContent(device.device_id[0]);
        }

        showPlaylist(){
            this.visible = true;
            // this.$view.removeClass('hidden');
            this.$view.show('fast');
        }

        hidePlaylist(){
            this.visible = false;
            // this.$view.addClass('hidden');
            this.$view.hide('fast');
        }

        togglePlaylist(){
            if(this.visible){this.hidePlaylist()}
            else {this.showPlaylist()}
        }

        getPlayingContent(deviceId: string){
            // console.log('getPlayingContent');

            // let src_thumb1 = 'http://34.196.180.158:7001/MagicInfo/servlet/ContentThumbnail?thumb_id=';
            // let src_thumb2 = '&thumb_filename=';
            // let src_thumb3 = '_MEDIUM.PNG&width=100&height=56';
            let $myList = $("<ul>");
            $.get('/api/getPlayingContent/' + deviceId).done((res)=> {
                if(res.length){
                    console.log('ContentInfoArr', res);
                    res.forEach((item, i, arr) => {
                        this.setPlayingContent(item,$myList);
                        // let li = $('<li>').appendTo($myList);
                        // let div = $('<div>').appendTo(li);
                        // let img = $('<img>').attr('src',src_thumb1 + item.thumb_file_id[0] +
                        //     src_thumb2 + item.thumb_file_name[0]+
                        //     src_thumb3).appendTo(div);
                        //
                        // let p = $('<p>').addClass('name').appendTo(div);
                        // $('<span>').addClass('name text-overflow').text(item.content_name[0]).appendTo(p);
                    });
                } else {
                    console.log('ContentInfo', res);
                    this.$listConteiner.removeClass('scrolling').addClass('noscrolling');
                    this.setPlayingContent(res,$myList);
                    // let li = $('<li>').appendTo($myList);
                    // let div = $('<div>').appendTo(li);
                    // let img = $('<img>').attr('src',src_thumb1 + res.thumb_file_id[0] +
                    //     src_thumb2 + res.thumb_file_name[0]+
                    //     src_thumb3).appendTo(div);
                    //
                    // let p = $('<p>').addClass('name').appendTo(div);
                    // $('<span>').addClass('name text-overflow').text(res.content_name[0]).appendTo(p);
                }
                this.$list = $myList;
                this.$listConteiner.append($myList);
                // console.log('ContentInfo', res);
            }).fail((err)=> {
                console.error('error', err);
                return err;
            });
        }

        setPlayingContent(playingContent: any, myList: any){
            let src_thumb1 = 'http://34.196.180.158:7001/MagicInfo/servlet/ContentThumbnail?thumb_id=';
            let src_thumb2 = '&thumb_filename=';
            let src_thumb3 = '_MEDIUM.PNG';
            // let src_thumb3 = '_MEDIUM.PNG&width=100&height=56';

            let li = $('<li>').appendTo(myList); // reference to $myList
            let div = $('<div>').appendTo(li);
            let img = $('<img>').attr('src',src_thumb1 + playingContent.thumb_file_id[0] +
                src_thumb2 + playingContent.thumb_file_name[0]+
                src_thumb3).appendTo(div);

            let p = $('<p>').addClass('name').appendTo(div);
            $('<span>').addClass('name text-overflow').text(playingContent.content_name[0]).appendTo(p);
        }
}
