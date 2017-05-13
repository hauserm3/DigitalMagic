///<reference path="index.d.ts"/>
import {MyPlaylist} from "./myPlaylist";
import {MyModal} from "../modal/myModal";
declare var globalDispather$: JQuery;

export class CustomMarker extends google.maps.OverlayView {

  // latlng: google.maps.LatLng;
  // args;
  // div: HTMLElement;
  $view: JQuery;
  $thumb: JQuery;

  deviceConnection: string;
  deviceId: string;
  playlist: MyPlaylist;
  modal: MyModal;
  thumbDevice: string;

  img: HTMLImageElement;
  label: HTMLElement;

  constructor(private latlng: google.maps.LatLng,
              private map: google.maps.Map,
              private args: { marker_id: string, color: string },
              private myDevice) {
    super();
    this.setMap(map);
    this.deviceId = myDevice.device_id[0];
    this.getDeviceConnection();
    setInterval(() => {
      this.getDeviceConnection();
    }, 5000);
    // console.log('CustomMarker constructor');
  }

  // createDiv(){
  //
  //     let div =  document.createElement('div');
  //
  //     div.className = 'myDevice';
  //
  //     let divImage = document.createElement('div');
  //     divImage.classList.add('img_wrapper');
  //     div.appendChild(divImage);
  //
  //     let img = document.createElement('img');
  //     divImage.appendChild(img);
  //     let divLabel = document.createElement('div');
  //     divLabel.classList.add('myLabel');
  //     div.appendChild(divLabel);
  //
  //     this.img = img;
  //     this.label = divLabel;
  //
  //     if (typeof(this.args.marker_id) !== 'undefined') {
  //         div.dataset.marker_id = this.args.marker_id;
  //     }
  //
  //     if (typeof(this.args.color) !== 'undefined') {
  //         div.dataset.colour = this.args.color;
  //     }
  //
  //     return div;
  // }

  createDevice(): JQuery {
    let device = this.myDevice;
    this.$thumb = $('<div>').addClass('dev_img_thumb');
    let $view = $('<div>').addClass('device thumbview_wrapper');

    let ViewThumb1 = $('<div>').addClass('thumbview_box device_thumb').css('cursor', 'pointer');
    let ViewThumb2 = $('<div>').addClass('dev_thumb_img_wrapper');
    // this.$thumb = $('<div>').addClass('dev_img_thumb').attr('data-toggle', 'modal').attr('data-target','#Modal');

    let toolText = "toolTip('Device type: " + device.device_type[0] + "<br>" +
      "Resolution: " + device.resolution[0] + "<br>" +
      "MAC Address: " + device.mac_address[0] + "<br>" +
      "IP Address: " + device.ip_address[0] + "<br>')";
    let ViewName1 = $('<div>').css('cursor', 'pointer').attr('onMouseOver', toolText).attr('onMouseOut', "toolTip()");
    let ViewName2 = $('<div>').addClass('status_wrap clearfix bg_babcbc');
    let ViewName3 = $('<span>').text(device.device_name[0]);

    this.$thumb.appendTo(ViewThumb2.appendTo(ViewThumb1));
    ViewThumb1.appendTo($view);
    ViewName3.appendTo(ViewName2.appendTo(ViewName1));
    ViewName1.appendTo($view);

    return $view;
  }

  getDeviceConnection() {
    $.get('/api/getDeviceConnection/' + this.deviceId)
      .done(res => this.setDeviceState(res))
      .fail(err => this.onError(err));
  }

  setDeviceState(state: string) {
    this.deviceConnection = state;
    if (!this.$view) return;
    if (state == 'true') {
      this.$view.addClass('active');
      this.getThumbnail();

      this.$thumb.on('click', function () {
        console.log('onClick MODAL');
        globalDispather$.triggerHandler('thumbClick', this.device);
      });

    } else {
      this.$view.removeClass('active')
    }

    // if (state == 'true') {
    //   this.$view.addClass('active');
    //   this.$thumb.attr('data-toggle', 'modal').attr('data-target', '#Modal-' + this.deviceId);
    //   this.getThumbnail();
    //   this.playlist = new MyPlaylist(this.myDevice);
    //   // this.$view.append(this.playlist.$view);
    //
    //   this.modal = new MyModal(this.myDevice);
    //   this.$view.append(this.modal.$view);
    //   this.modal.$modalFooter.append(this.playlist.$view);
    // }
    // else {
    //   this.$view.removeClass('active')
    // }
  }

  // setDeviceName(){
  //     this.label.innerText = this.myDevice.device_name[0];
  // }

  addDivToPanes(div: HTMLElement) {
    let panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  addEvent(div: HTMLElement) {
    google.maps.event.addDomListener(div, "click", function (event) {
      alert('You clicked on a custom marker!');
      google.maps.event.trigger(this, "click");
    });
  }

  draw() {
    console.log('draw');

    if (!this.$view) {
      this.$view = this.createDevice();
      // this.div = this.createDiv();
      // this.addEvent(this.div);
      // console.log('this.$view.get(0)', this.$view.get(0));
      this.addDivToPanes(this.$view.get(0));
      // this.setDeviceName();
    }

    let point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
      this.$view.css({left: (point.x - 10) + 'px', top: (point.y - 20) + 'px'});
    }
  };

  getThumbnail() {
    let device_id = this.deviceId;
    $.get('/api/getDeviceThumbnailURL/' + device_id).done((res) => {
      // console.log('res', res);;
      this.thumbDevice = res;
      this.$thumb.css({
        "background-image": "url(" + "'" + res + "'" + ")",
        "background-size": "auto 100%",
      });
      // this.modal.setModalThumb(this.thumbDevice);
      // console.log('modal.thumbDevice', this.modal.thumbDevice)
    }).fail(this.onError);
  }

  remove() {
    if (this.$view) {
      this.$view.remove();
      this.$view = null;
    }
  };

  getPosition() {
    return this.latlng;
  };

  onError(error) {
    console.error(error);
  }
}


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