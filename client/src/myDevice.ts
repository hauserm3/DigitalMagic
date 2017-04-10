///<reference path="index.d.ts"/>
///<reference path="myPlaylist.ts"/>


module magic {
    export class MyDevice{
        container = $('#MyContainer');
        $view: JQuery;
        $thumb: JQuery;
        deviceConnection: string;
        deviceId: string;
        playlist: MyPlaylist;

        constructor(private device: any){
            this.device = device;
            this.$view = $('<div>').attr('id', this.device.device_id[0]).addClass('device thumbview_wrapper');
            this.$view.on('click',()=>{
               if(this.playlist){
                   this.playlist.togglePlaylist();
               }
            });
            this.deviceId = device.device_id[0];
            this.init();
            // console.log('DEVICE', device);
            this.getDeviceConnection();
        }

        init(){
            let ViewThumb1 = $('<div>').addClass('thumbview_box device_thumb');
            let ViewThumb2 = $('<div>').addClass('dev_thumb_img_wrapper');
            this.$thumb = $('<div>').addClass('dev_img_thumb');

            let toolText = "toolTip('Device type: "+this.device.device_type[0]+"<br>" +
                "Resolution: "+this.device.resolution[0]+"<br>" +
                "MAC Address: "+this.device.mac_address[0]+"<br>" +
                "IP Address: "+this.device.ip_address[0]+"<br>')";
            let ViewName1 = $('<div>').css('cursor','pointer').attr('onMouseOver',toolText).attr('onMouseOut',"toolTip()");
            let ViewName2 = $('<div>').addClass('status_wrap clearfix bg_babcbc');
            let ViewName3 = $('<span>').attr('id', 'name-'+this.device.device_id[0]);

            this.$view.appendTo(this.container);
            this.$thumb.appendTo(ViewThumb2.appendTo(ViewThumb1));
            ViewThumb1.appendTo(this.$view);
            ViewName3.appendTo(ViewName2.appendTo(ViewName1));
            ViewName1.appendTo(this.$view);

            this.setDeviceName();
        }

        createDeviceBlock(position){
            this.$view.css(position);
        }

        setDeviceName(){
            $("#name-" + this.device.device_id[0]).text(this.device.device_name[0]);
        }

        getDeviceConnection(){
            $.get('getDeviceConnection' + '?deviceId=' + this.deviceId)
                .done(res => this.setDeviceState(res))
                .fail(err => this.onError(err));
        }

        setDeviceState(state: string){
            if(state == 'true'){
                this.$view.addClass('active');
                this.getThumbnail();
                this.playlist = new MyPlaylist(this.device);
                this.$view.append(this.playlist.$view)
            }
            else {this.$view.removeClass('active')}
            this.deviceConnection = state;
        }

        getThumbnail(){
            let device_id = this.deviceId;
            $.get('getDeviceThumbnailURL' + '?device_id=' + device_id).done((res)=> {
                // console.log('res', res);
                this.$thumb.css({
                    "background-image": "url(" + "'" + res + "'" + ")",
                    "background-size": "auto 100%",
                });
            }).fail(this.onError);
        }

        onError(error){
            console.error(error);
        }
    }
}