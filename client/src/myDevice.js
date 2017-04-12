///<reference path="index.d.ts"/>
///<reference path="myPlaylist.ts"/>
///<reference path="myModal.ts"/>
var magic;
(function (magic) {
    var MyDevice = (function () {
        function MyDevice(device) {
            this.device = device;
            this.container = $('#MyContainer');
            this.device = device;
            this.$view = $('<div>').attr('id', this.device.device_id[0]).addClass('device thumbview_wrapper');
            // this.$view.on('click',()=>{
            //    if(this.playlist){
            //        this.playlist.togglePlaylist();
            //    }
            // });
            this.deviceId = device.device_id[0];
            this.init();
            // console.log('DEVICE', device);
            this.getDeviceConnection();
        }
        MyDevice.prototype.init = function () {
            var ViewThumb1 = $('<div>').addClass('thumbview_box device_thumb');
            var ViewThumb2 = $('<div>').addClass('dev_thumb_img_wrapper');
            this.$thumb = $('<div>').addClass('dev_img_thumb');
            // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');
            var toolText = "toolTip('Device type: " + this.device.device_type[0] + "<br>" +
                "Resolution: " + this.device.resolution[0] + "<br>" +
                "MAC Address: " + this.device.mac_address[0] + "<br>" +
                "IP Address: " + this.device.ip_address[0] + "<br>')";
            var ViewName1 = $('<div>').css('cursor', 'pointer').attr('onMouseOver', toolText).attr('onMouseOut', "toolTip()");
            var ViewName2 = $('<div>').addClass('status_wrap clearfix bg_babcbc');
            var ViewName3 = $('<span>').attr('id', 'name-' + this.device.device_id[0]);
            this.$view.appendTo(this.container);
            this.$thumb.appendTo(ViewThumb2.appendTo(ViewThumb1));
            ViewThumb1.appendTo(this.$view);
            ViewName3.appendTo(ViewName2.appendTo(ViewName1));
            ViewName1.appendTo(this.$view);
            this.setDeviceName();
        };
        MyDevice.prototype.createDeviceBlock = function (position) {
            this.$view.css(position);
        };
        MyDevice.prototype.setDeviceName = function () {
            $("#name-" + this.device.device_id[0]).text(this.device.device_name[0]);
        };
        MyDevice.prototype.getDeviceConnection = function () {
            var _this = this;
            $.get('getDeviceConnection' + '?deviceId=' + this.deviceId)
                .done(function (res) { return _this.setDeviceState(res); })
                .fail(function (err) { return _this.onError(err); });
        };
        MyDevice.prototype.setDeviceState = function (state) {
            if (state == 'true') {
                this.$view.addClass('active');
                this.$thumb.attr('data-toggle', 'modal').attr('data-target', '#Modal-' + this.deviceId);
                this.getThumbnail();
                this.playlist = new magic.MyPlaylist(this.device);
                // this.$view.append(this.playlist.$view);
                this.modal = new magic.MyModal(this.device);
                this.$view.append(this.modal.$view);
                this.modal.$modalFooter.append(this.playlist.$view);
            }
            else {
                this.$view.removeClass('active');
            }
            this.deviceConnection = state;
        };
        MyDevice.prototype.getThumbnail = function () {
            var _this = this;
            var device_id = this.deviceId;
            $.get('getDeviceThumbnailURL' + '?device_id=' + device_id).done(function (res) {
                // console.log('res', res);;
                _this.thumbDevice = res;
                _this.$thumb.css({
                    "background-image": "url(" + "'" + res + "'" + ")",
                    "background-size": "auto 100%",
                });
                _this.modal.setModalThumb(_this.thumbDevice);
                console.log('modal.thumbDevice', _this.modal.thumbDevice);
            }).fail(this.onError);
        };
        // getOrganizationList(){
        //     $.get('getOrganizationList').done((res)=> {
        //         console.log('getOrganizationList', res);
        //     }).fail(this.onError);
        // }
        MyDevice.prototype.onError = function (error) {
            console.error(error);
        };
        return MyDevice;
    }());
    magic.MyDevice = MyDevice;
})(magic || (magic = {}));
//# sourceMappingURL=myDevice.js.map