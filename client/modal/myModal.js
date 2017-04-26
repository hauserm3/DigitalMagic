"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myPlaylist_1 = require("./myPlaylist");
var MyModal = (function () {
    // constructor(){
    function MyModal(device) {
        var _this = this;
        this.device = device;
        this.device = device;
        this.deviceId = device.device_id[0];
        console.log('this.device', this.device);
        // console.log('this.thumbDevice', this.thumbDevice);
        // this.playlist = new MyPlaylist(device);
        this.playlist = new myPlaylist_1.MyPlaylist(device);
        this.init();
        this.setModalDeviceInfo();
        // this.setModalDevicePlayingContentInfo();
        this.setModalPlayingContentInfo();
        this.setModalThumb();
        setInterval(function () {
            _this.setModalThumb();
            _this.setModalPlayingContentInfo();
            _this.setModalDevicePlayingContentInfo();
        }, 5000);
    }
    MyModal.prototype.init = function () {
        // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');
        this.$view = $('<div>').attr({ 'id': 'Modal', 'role': 'dialog' }).addClass('modal');
        this.$modalDialog = $('<div>').addClass('modal-dialog modal-lg').attr('role', 'document').appendTo(this.$view);
        this.$modalContent = $('<div>').addClass('modal-content').appendTo(this.$modalDialog);
        this.$modalHeader = $('<div>').addClass('modal-header').appendTo(this.$modalContent);
        this.$modalHeader.append($('<h4>').addClass('modal-title').text('Device: ' + this.device.device_name[0]));
        this.$modalHeader.append($('<button>').attr({
            'type': 'button',
            'data-dismiss': 'modal'
        }).addClass('close').text('x'));
        this.$modalBody = $('<div>').addClass('modal-body').appendTo(this.$modalContent);
        // this.$deviceModal = $('<div>').addClass('device_modal');
        // this.$deviceModal.append($('<h6>').text('DEVICE')).appendTo(this.$modalBody);
        this.$deviceModal = $('<div>').addClass('form-group device_modal');
        this.$deviceModal.append($('<label>').text('DEVICE')).appendTo(this.$modalBody);
        this.$deviceSelect = $('<select>').addClass('form-control').attr('multiple', '').css('height', '150px');
        this.$deviceModal.append(this.$deviceSelect).appendTo(this.$modalBody);
        // this.$contentInfoModal = $('<div>').addClass('device_modal');
        // this.$contentInfoModal.append($('<h6>').text('CONTENT')).appendTo(this.$modalBody);
        this.$contentInfoModal = $('<div>').addClass('form-group device_modal');
        this.$contentInfoModal.append($('<label>').text('CONTENT')).appendTo(this.$modalBody);
        this.$contentSelect = $('<select>').addClass('form-control').attr('multiple', '').css('height', '150px');
        this.$contentInfoModal.append(this.$contentSelect).appendTo(this.$modalBody);
        var tb = $('<div>').addClass('thumbview_box_modal device_thumb_modal');
        var dtiw = $('<div>').addClass('dev_thumb_img_wrapper_modal');
        this.$imgThumb = $('<div>').addClass('dev_img_thumb_modal').css("background-size", "auto 100%");
        this.$modalBody.append(tb.append(dtiw.append(this.$imgThumb)));
        this.$modalFooter = $('<div>').addClass('modal-footer').appendTo(this.$modalContent);
        this.$modalFooter.append(this.playlist.$view);
    };
    MyModal.prototype.setModalDeviceInfo = function () {
        for (var key in this.device) {
            this.$deviceSelect.append($('<option>').text(key + ': ' + this.device[key][0]));
            // this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
            // console.log('key', key);
            // console.log('key[0]', this.device[key][0]);
        }
    };
    MyModal.prototype.setModalDevicePlayingContentInfo = function () {
        var _this = this;
        $.get('/api/getDevicePlayingContent/' + this.deviceId).done(function (res) {
            console.log('res', res);
            for (var key in res.data) {
                if (key == '$')
                    continue;
                if (key == 'contentLists') {
                    var contentLists = res.data[key][0].ContentList[0];
                    for (var key_1 in contentLists) {
                        _this.$contentSelect.append($('<option>').text(key_1 + ': ' + contentLists[key_1][0]));
                        // this.$contentInfoModal.append($('<p>').text(key + ': ' + contentLists[key][0]));
                    }
                    continue;
                }
                _this.$contentSelect.append($('<option>').text(key + ': ' + res.data[key][0]));
                // console.log('key', key);
                // console.log('key[0]', this.device[key][0]);
            }
            // console.log('ContentInfo', res);
        }).fail(function (err) {
            console.error('error', err);
            return err;
        });
    };
    MyModal.prototype.setModalPlayingContentInfo = function () {
        var _this = this;
        $.get('/api/getPlayingContentInfo/' + this.deviceId).done(function (res) {
            console.log('res', res);
            if (res['content_id'][0] != _this.content_id) {
                _this.$contentSelect.empty();
                _this.content_id = res['content_id'][0];
                for (var key in res) {
                    if (key == '$')
                        continue;
                    _this.$contentSelect.append($('<option>').text(key + ': ' + res[key][0]));
                    // console.log('key', key);
                    // console.log('key[0]', this.device[key][0]);
                }
            }
            // console.log('ContentInfo', res);
        }).fail(function (err) {
            console.error('error', err);
            return err;
        });
    };
    MyModal.prototype.setModalContentInfo = function () {
        for (var key in this.device) {
            this.$contentSelect.append($('<option>').text(key + ': ' + this.device[key][0]));
            // this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
            // console.log('key', key);
            // console.log('key[0]', this.device[key][0]);
        }
    };
    MyModal.prototype.setModalThumb = function (par) {
        var _this = this;
        $.get('/api/getDeviceThumbnailURL/' + this.deviceId).done(function (res) {
            // console.log('res', res);
            _this.thumbDevice = res.substr(0, res.length - 11);
            // console.log('this.thumbDevice', this.thumbDevice);
            _this.$imgThumb.css("background-image", "url(" + "'" + _this.thumbDevice + "'" + ")");
        }).fail(this.onError);
    };
    MyModal.prototype.onError = function (error) {
        console.error(error);
    };
    return MyModal;
}());
exports.MyModal = MyModal;
var modal;
function initModal() {
    console.log(globalDispather$);
    globalDispather$.on('thumbClick', function (evt, obj) {
        if (modal)
            modal.$view.remove();
        modal = new MyModal(obj);
        $('body').append(modal.$view);
        modal.$view.fadeIn('fast');
        modal.$view.on('click', function (evt) {
            var target = $(evt.target);
            //            console.log('targget', target.hasClass('close'));
            console.log('targget', target);
            //            if(target.attr('id','Modal') || target.hasClass('close')){
            if (target.hasClass('close') || target.hasClass('modal')) {
                modal.$view.fadeOut('fast', function () {
                    modal.$view.remove();
                });
            }
        });
        console.log('obj', obj);
    });
}
exports.initModal = initModal;
