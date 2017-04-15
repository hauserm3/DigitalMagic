///<reference path="index.d.ts"/>
///<reference path="myPlaylist.ts"/>
///<reference path="myModal.ts"/>
///<reference path="myCustomGoogleMapMarker.ts"/>



module magic {
    export class MyDevice{
        container = $('#MyContainer');
        $view: JQuery;
        $thumb: JQuery;
        deviceConnection: string;
        deviceId: string;
        playlist: MyPlaylist;
        modal: MyModal;
        thumbDevice: string;

        constructor(private device: any){
            this.device = device;
            this.$thumb = $('<div>').addClass('dev_img_thumb');
            this.$view = this.createDiv(device);
            this.$view.appendTo(this.container);
            // this.$view = $('<div>').attr('id', this.device.device_id[0]).addClass('device thumbview_wrapper');
            // this.$view.on('click',()=>{
            //    if(this.playlist){
            //        this.playlist.togglePlaylist();
            //    }
            // });
            this.deviceId = device.device_id[0];
            // console.log('DEVICE', device);
            this.getDeviceConnection();
        }

        createDiv(device): JQuery{
            let div = $('<div>').addClass('device thumbview_wrapper');
            let ViewThumb1 = $('<div>').addClass('thumbview_box device_thumb');
            let ViewThumb2 = $('<div>').addClass('dev_thumb_img_wrapper');
            // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');

            let toolText = "toolTip('Device type: "+device.device_type[0]+"<br>" +
                "Resolution: "+device.resolution[0]+"<br>" +
                "MAC Address: "+device.mac_address[0]+"<br>" +
                "IP Address: "+device.ip_address[0]+"<br>')";
            let ViewName1 = $('<div>').css('cursor','pointer').attr('onMouseOver',toolText).attr('onMouseOut',"toolTip()");
            let ViewName2 = $('<div>').addClass('status_wrap clearfix bg_babcbc');
            let ViewName3 = $('<span>').attr('id', 'name-'+device.device_id[0]);

            this.$thumb.appendTo(ViewThumb2.appendTo(ViewThumb1));
            ViewThumb1.appendTo(this.$view);
            ViewName3.appendTo(ViewName2.appendTo(ViewName1));
            ViewName1.appendTo(this.$view);

            this.setDeviceName();
            return div;
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
                this.$thumb.attr('data-toggle', 'modal').attr('data-target','#Modal-'+this.deviceId);
                this.getThumbnail();
                this.playlist = new MyPlaylist(this.device);
                // this.$view.append(this.playlist.$view);

                this.modal = new MyModal(this.device);
                this.$view.append(this.modal.$view);
                this.modal.$modalFooter.append(this.playlist.$view);
            }
            else {this.$view.removeClass('active')}
            this.deviceConnection = state;
        }

        getThumbnail(){
            let device_id = this.deviceId;
            $.get('getDeviceThumbnailURL' + '?device_id=' + device_id).done((res)=> {
                // console.log('res', res);;
                this.thumbDevice = res;
                this.$thumb.css({
                    "background-image": "url(" + "'" + res + "'" + ")",
                    "background-size": "auto 100%",
                });
                this.modal.setModalThumb(this.thumbDevice);
                console.log('modal.thumbDevice', this.modal.thumbDevice)
            }).fail(this.onError);
        }

        // getOrganizationList(){
        //     $.get('getOrganizationList').done((res)=> {
        //         console.log('getOrganizationList', res);
        //     }).fail(this.onError);
        // }

        onError(error){
            console.error(error);
        }
    }
}