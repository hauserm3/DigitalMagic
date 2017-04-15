///<reference path="index.d.ts"/>
var magic;
(function (magic) {
    var MyModal = (function () {
        // constructor(){
        function MyModal(device) {
            this.device = device;
            this.device = device;
            this.deviceId = device.device_id[0];
            console.log('this.device', this.device);
            // this.thumbDevice = thumbDevice.substr(0, thumbDevice.length - 11);
            this.init();
            this.setModalDeviceInfo();
            this.setModalDevicePlayingContentInfo();
        }
        MyModal.prototype.init = function () {
            this.$view = $('<div>').attr({ 'id': 'Modal-' + this.device.device_id[0], 'role': 'dialog' }).addClass('modal fade');
            this.$modalDialog = $('<div>').addClass('modal-dialog modal-lg').appendTo(this.$view);
            this.$modalContent = $('<div>').addClass('modal-content').appendTo(this.$modalDialog);
            this.$modalHeader = $('<div>').addClass('modal-header').appendTo(this.$modalContent);
            this.$modalHeader.append($('<button>').attr({ 'type': 'button', 'data-dismiss': 'modal' }).addClass('close').text('x'));
            this.$modalHeader.append($('<h4>').addClass('modal-title').text('Device: ' + this.device.device_name[0]));
            this.$modalBody = $('<div>').addClass('modal-body').appendTo(this.$modalContent);
            this.$deviceModal = $('<div>').addClass('device_modal');
            this.$deviceModal.append($('<h6>').text('DEVICE')).appendTo(this.$modalBody);
            this.$contentInfoModal = $('<div>').addClass('device_modal');
            this.$contentInfoModal.append($('<h6>').text('CONTENT')).appendTo(this.$modalBody);
            var tb = $('<div>').addClass('thumbview_box_modal device_thumb_modal');
            var dtiw = $('<div>').addClass('dev_thumb_img_wrapper_modal');
            this.$imgThumb = $('<div>').addClass('dev_img_thumb_modal').css("background-size", "auto 100%");
            this.$modalBody.append(tb.append(dtiw.append(this.$imgThumb)));
            this.$modalFooter = $('<div>').addClass('modal-footer').appendTo(this.$modalContent);
            // this.$modalFooter.append($('<button>').attr({'type':'button','data-dismiss':'modal'}).addClass('btn btn-default').text('Close'));
        };
        MyModal.prototype.setModalDeviceInfo = function () {
            for (var key in this.device) {
                this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
                // console.log('key', key);
                // console.log('key[0]', this.device[key][0]);
            }
        };
        MyModal.prototype.setModalDevicePlayingContentInfo = function () {
            var _this = this;
            $.get('getDevicePlayingContent' + '?deviceId=' + this.deviceId).done(function (res) {
                console.log('res', res);
                for (var key in res) {
                    if (key == 'contentLists') {
                        var contentLists = res[key][0].ContentList[0];
                        for (var key_1 in contentLists) {
                            _this.$contentInfoModal.append($('<p>').text(key_1 + ': ' + contentLists[key_1][0]));
                        }
                        continue;
                    }
                    _this.$contentInfoModal.append($('<p>').text(key + ': ' + res[key][0]));
                    // console.log('key', key);
                    // console.log('key[0]', this.device[key][0]);
                }
                // console.log('ContentInfo', res);
            }).fail(function (err) {
                console.error('error', err);
                return err;
            });
        };
        MyModal.prototype.setModalContentInfo = function () {
            for (var key in this.device) {
                this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
                // console.log('key', key);
                // console.log('key[0]', this.device[key][0]);
            }
        };
        MyModal.prototype.setModalThumb = function (thumbDevice) {
            this.thumbDevice = thumbDevice.substr(0, thumbDevice.length - 11);
            console.log('this.thumbDevice', this.thumbDevice);
            this.$imgThumb.css("background-image", "url(" + "'" + this.thumbDevice + "'" + ")");
        };
        return MyModal;
    }());
    magic.MyModal = MyModal;
})(magic || (magic = {}));
//# sourceMappingURL=myModal.js.map