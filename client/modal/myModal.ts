/// <reference path="../../node_modules/retyped-mustache-tsd-ambient/mustache.d.ts" />
import {MyPlaylist} from "../src/myPlaylist";
import * as jQuery from "jquery";

export class MyModal {

  visible: boolean;

  $view: JQuery;
  $modalDialog: JQuery;
  $modalContent: JQuery;
  $modalHeader: JQuery;

  $modalBody: JQuery;
  $deviceModal: JQuery;
  $contentInfoModal: JQuery;
  $imgThumb: JQuery;

  $deviceSelect: JQuery;
  $contentSelect: JQuery;

  $modalFooter: JQuery;

  deviceId: string;
  thumbDevice: string;
  content_id: string;

  device;
  playlist: MyPlaylist;

  // constructor(){
  constructor() {
    this.init();
    // this.setModalDevicePlayingContentInfo();
  }

  deviceInfo: MyView;
  playingContentInfo: MyView;
  playlistTemplate: MyView;

  init() {
    // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');

    this.$view = $('#Modal').load('modal/modalTemplate.html').ready(()=>{

      this.deviceInfo = new MyView($('#deviceInfo'));
      this.deviceInfo.load('modal/deviceInfoTemplate.html');

      this.playingContentInfo = new MyView($('#contentInfo'));
      this.playingContentInfo.load('modal/playingContentInfo.html');

      this.playlistTemplate = new MyView($('#playlist'));
      this.playlistTemplate.load('modal/playlistTemplate.html');

    });

    // $.get('modal/modalTemplate.html', function (template) {
    //   modalTemplate = template;
    //   let modalRendered = Mustache.render(modalTemplate, {});
    //   // $('body').html(modalRendered);
    // });

    // this.$modalDialog = $('<div>').addClass('modal-dialog modal-lg').attr('role', 'document').appendTo(this.$view);
    // this.$modalContent = $('<div>').addClass('modal-content').appendTo(this.$modalDialog);
    //
    // this.$modalHeader = $('<div>').addClass('modal-header').appendTo(this.$modalContent);
    // this.$modalHeader.append($('<h4>').addClass('modal-title').text('Device: ' + this.device.device_name[0]));
    // this.$modalHeader.append($('<button>').attr({
    //   'type': 'button',
    //   'data-dismiss': 'modal'
    // }).addClass('close').text('x'));


    // this.$modalBody = $('<div>').addClass('modal-body').appendTo(this.$modalContent);
    // // this.$deviceModal = $('<div>').addClass('device_modal');
    // // this.$deviceModal.append($('<h6>').text('DEVICE')).appendTo(this.$modalBody);
    // this.$deviceModal = $('<div>').addClass('form-group device_modal');
    // this.$deviceModal.append($('<label>').text('DEVICE')).appendTo(this.$modalBody);
    // this.$deviceSelect = $('<select>').addClass('form-control').attr('multiple', '').css('height', '150px');
    // this.$deviceModal.append(this.$deviceSelect).appendTo(this.$modalBody);
    // // this.$contentInfoModal = $('<div>').addClass('device_modal');
    // // this.$contentInfoModal.append($('<h6>').text('CONTENT')).appendTo(this.$modalBody);
    // this.$contentInfoModal = $('<div>').addClass('form-group device_modal');
    // this.$contentInfoModal.append($('<label>').text('CONTENT')).appendTo(this.$modalBody);
    this.$contentSelect = $('<select>').addClass('form-control').attr('multiple', '').css('height', '150px');
    // this.$contentInfoModal.append(this.$contentSelect).appendTo(this.$modalBody);

    // let tb = $('<div>').addClass('thumbview_box_modal device_thumb_modal');
    // let dtiw = $('<div>').addClass('dev_thumb_img_wrapper_modal');
    // this.$imgThumb = $('<div>').addClass('dev_img_thumb_modal').css("background-size", "auto 100%");
    // this.$modalBody.append(tb.append(dtiw.append(this.$imgThumb)));
    //
    //
    // this.$modalFooter = $('<div>').addClass('modal-footer').appendTo(this.$modalContent);
    //
    // this.$modalFooter.append(this.playlist.$view);
  }

  setModalDeviceInfo(device) {
    this.device = device;

    this.deviceId = device.device_id[0];
    console.log('this.device', this.device);
    // console.log('this.thumbDevice', this.thumbDevice);

    this.playlist = new MyPlaylist(device);

    this.setModalPlayingContentInfo();
    this.setModalThumb();
    setInterval(() => {
      this.setModalThumb();
      this.setModalPlayingContentInfo();
      // this.setModalDevicePlayingContentInfo();
    }, 5000);


    let deviceInfo = {
      device_name: this.device.device_name[0],
      screen_size: this.device.screen_size[0],
      ip_address: this.device.ip_address[0],
      resolution: this.device.resolution[0]
    };

    this.deviceInfo.render(deviceInfo);

    // for (let key in this.device) {
    //   this.$deviceSelect.append($('<option>').text(key + ': ' + this.device[key][0]));
    //   // this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
    //   // console.log('key', key);
    //   // console.log('key[0]', this.device[key][0]);
    // }
  }

  setModalDevicePlayingContentInfo() {
    $.get('/api/getDevicePlayingContent/' + this.deviceId).done((res) => {
      console.log('res', res);
      for (let key in res.data) {
        if (key == '$') continue;
        if (key == 'contentLists') {
          let contentLists = res.data[key][0].ContentList[0];
          for (let key in contentLists) {
            this.$contentSelect.append($('<option>').text(key + ': ' + contentLists[key][0]));
            // this.$contentInfoModal.append($('<p>').text(key + ': ' + contentLists[key][0]));
          }
          continue;
        }
        this.$contentSelect.append($('<option>').text(key + ': ' + res.data[key][0]));
        // console.log('key', key);
        // console.log('key[0]', this.device[key][0]);
      }
      // console.log('ContentInfo', res);
    }).fail((err) => {
      console.error('error', err);
      return err;
    });
  }

  setModalPlayingContentInfo() {
    $.get('/api/getPlayingContentInfo/' + this.deviceId).done((res) => {
      // console.log('res', res);
      let contentInfo;
      if (res['content_id'][0] != this.content_id) {
        this.$contentSelect.empty();
        this.content_id = res['content_id'][0];
        for (let key in res) {
          if (key == '$') continue;
          contentInfo = {contentKey: key, contentVal: res[key][0]};
          // this.$contentSelect.append($('<option>').text(key + ': ' + res[key][0]));
          // console.log('key', key);
          // console.log('key[0]', this.device[key][0]);
        }
      }
      this.playingContentInfo.render(contentInfo);
      // console.log('ContentInfo', res);
    }).fail((err) => {
      console.error('error', err);
      return err;
    });
  }

  setModalContentInfo() {
    for (let key in this.device) {
      this.$contentSelect.append($('<option>').text(key + ': ' + this.device[key][0]));
      // this.$deviceModal.append($('<p>').text(key + ': ' + this.device[key][0]));
      // console.log('key', key);
      // console.log('key[0]', this.device[key][0]);
    }
  }

  setModalThumb(par?: any) {
    $.get('/api/getDeviceThumbnailURL/' + this.deviceId).done((res) => {
      // console.log('res', res);
      this.thumbDevice = res.substr(0, res.length - 11);
      // console.log('this.thumbDevice', this.thumbDevice);
      // this.$imgThumb.css(
      //   "background-image", "url(" + "'" + this.thumbDevice + "'" + ")"
      // );
    }).fail(this.onError);

  }

  modalTemplateRendered(){

    // let data = {
    //   deviceInfo: this.deviceInfo,
    //   contentInfo: this.playingContentInfo,
    //   thumbDevice: this.thumbDevice
    // };

    // console.log('data', data);
    let modalRendered = Mustache.render(modalTemplate,{});
    this.$view.html(modalRendered);
    // console.log('modalRenderedThumb', modalRendered);
  }

  onError(error) {
    console.error(error);
  }

}

export class MyView{
  template: string;

  constructor(private $view: JQuery){}

  render(model: any){
    this.$view.html(Mustache.render(this.template, model));
  }

  load(url: string){
    $.get(url, (template)=> {
      this.template = template;
    });
  }
}

declare var globalDispather$: JQuery;

var modal;
let modalTemplate;
let deviceInfoTemplate;
let playingContentInfo;
let playlistTemplate;

export function initModal() {

  modal = new MyModal();

  console.log('globalDispather$', globalDispather$);
  globalDispather$.on('thumbClick', function (evt, obj) {
    // if (modal) modal.$view.remove();
    // modal = new MyModal(obj);
    // $('body').append(modal.$view);

    modal.setModalDeviceInfo(obj);

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
