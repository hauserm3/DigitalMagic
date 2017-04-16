///<reference path="index.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var magic;
(function (magic) {
    var CustomMarker = (function (_super) {
        __extends(CustomMarker, _super);
        function CustomMarker(latlng, map, args, myDevice) {
            var _this = _super.call(this) || this;
            _this.latlng = latlng;
            _this.map = map;
            _this.args = args;
            _this.myDevice = myDevice;
            _this.setMap(map);
            return _this;
        }
        CustomMarker.prototype.createDiv = function () {
            var div = document.createElement('div');
            div.className = 'myDevice';
            var divImage = document.createElement('div');
            divImage.classList.add('img_wrapper');
            div.appendChild(divImage);
            var img = document.createElement('img');
            divImage.appendChild(img);
            var divLabel = document.createElement('div');
            divLabel.classList.add('myLabel');
            div.appendChild(divLabel);
            this.img = img;
            this.label = divLabel;
            if (typeof (this.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = this.args.marker_id;
            }
            if (typeof (this.args.color) !== 'undefined') {
                div.dataset.colour = this.args.color;
            }
            return div;
        };
        CustomMarker.prototype.createDevice = function () {
            var device = this.myDevice;
            this.$thumb = $('<div>').addClass('dev_img_thumb');
            var $view = $('<div>').addClass('device thumbview_wrapper');
            var ViewThumb1 = $('<div>').addClass('thumbview_box device_thumb');
            var ViewThumb2 = $('<div>').addClass('dev_thumb_img_wrapper');
            // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');
            var toolText = "toolTip('Device type: " + device.device_type[0] + "<br>" +
                "Resolution: " + device.resolution[0] + "<br>" +
                "MAC Address: " + device.mac_address[0] + "<br>" +
                "IP Address: " + device.ip_address[0] + "<br>')";
            var ViewName1 = $('<div>').css('cursor', 'pointer').attr('onMouseOver', toolText).attr('onMouseOut', "toolTip()");
            var ViewName2 = $('<div>').addClass('status_wrap clearfix bg_babcbc');
            var ViewName3 = $('<span>').text(device.device_name[0]);
            this.$thumb.appendTo(ViewThumb2.appendTo(ViewThumb1));
            ViewThumb1.appendTo($view);
            ViewName3.appendTo(ViewName2.appendTo(ViewName1));
            ViewName1.appendTo($view);
            return $view;
        };
        CustomMarker.prototype.getDeviceConnection = function () {
            var _this = this;
            $.get('getDeviceConnection' + '?deviceId=' + this.deviceId)
                .done(function (res) { return _this.setDeviceState(res); })
                .fail(function (err) { return _this.onError(err); });
        };
        CustomMarker.prototype.setDeviceState = function (state) {
            if (state == 'true') {
                this.$view.addClass('active');
                this.$thumb.attr('data-toggle', 'modal').attr('data-target', '#Modal-' + this.deviceId);
                this.getThumbnail();
                this.playlist = new magic.MyPlaylist(this.myDevice);
                // this.$view.append(this.playlist.$view);
                this.modal = new magic.MyModal(this.myDevice);
                this.$view.append(this.modal.$view);
                this.modal.$modalFooter.append(this.playlist.$view);
            }
            else {
                this.$view.removeClass('active');
            }
            this.deviceConnection = state;
        };
        // setDeviceName(){
        //     this.label.innerText = this.myDevice.device_name[0];
        // }
        CustomMarker.prototype.addDivToPanes = function (div) {
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        };
        CustomMarker.prototype.addEvent = function (div) {
            google.maps.event.addDomListener(div, "click", function (event) {
                alert('You clicked on a custom marker!');
                google.maps.event.trigger(this, "click");
            });
        };
        CustomMarker.prototype.draw = function () {
            if (!this.$view) {
                this.$view = this.createDevice();
                // this.div = this.createDiv();
                // this.addEvent(this.div);
                this.addDivToPanes(this.$view.get(0));
                // this.setDeviceName();
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
            if (point) {
                this.$view.css({ left: (point.x - 10) + 'px', top: (point.y - 20) + 'px' });
            }
        };
        ;
        CustomMarker.prototype.getThumbnail = function () {
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
        CustomMarker.prototype.remove = function () {
            if (this.$view) {
                this.$view.remove();
                this.$view = null;
            }
        };
        ;
        CustomMarker.prototype.getPosition = function () {
            return this.latlng;
        };
        ;
        CustomMarker.prototype.onError = function (error) {
            console.error(error);
        };
        return CustomMarker;
    }(google.maps.OverlayView));
    magic.CustomMarker = CustomMarker;
})(magic || (magic = {}));
// function CustomMarker(latlng, map, args) {
//     this.latlng = latlng;
//     this.args = args;
//     this.setMap(map);
// }
//
// CustomMarker.prototype = new google.maps.OverlayView();
//
// CustomMarker.prototype.draw = function () {
//
//     var self = this;
//
//     var div = this.div;
//
//     if (!div) {
//
//         div = this.div = document.createElement('div');
//
//         div.className = 'device thumbview_wrapper';
//
//         div.style.position = 'absolute';
//         div.style.cursor = 'pointer';
//         div.style.width = '20px';
//         div.style.height = '20px';
//         // div.style.background = 'blue';
//
//         if (typeof(self.args.marker_id) !== 'undefined') {
//             div.dataset.marker_id = self.args.marker_id;
//         }
//
//         if (typeof(self.args.colour) !== 'undefined') {
//             div.dataset.colour = self.args.colour;
//         }
//
//         google.maps.event.addDomListener(div, "click", function (event) {
//             alert('You clicked on a custom marker!');
//             google.maps.event.trigger(self, "click");
//         });
//
//         var panes = this.getPanes();
//         panes.overlayImage.appendChild(div);
//     }
//
//     var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
//
//     if (point) {
//         div.style.left = (point.x - 10) + 'px';
//         div.style.top = (point.y - 20) + 'px';
//     }
// };
//
// CustomMarker.prototype.remove = function () {
//     if (this.div) {
//         this.div.parentNode.removeChild(this.div);
//         this.div = null;
//     }
// };
//
// CustomMarker.prototype.getPosition = function () {
//     return this.latlng;
// }; 
//# sourceMappingURL=myCustomGoogleMapMarker.js.map