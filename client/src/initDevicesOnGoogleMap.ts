import {CustomMarker} from "./myCustomGoogleMapMarker";
import LatLng = google.maps.LatLng;

/**
 * Created by Vlad on 4/23/2017.
 */
export function initDevicesOnGoogleMap(map, devicesAr):JQueryDeferred<any> {
  let promise = $.Deferred();

  $.get('/api/getDevices/-1').done(function (res) {

    //devices_arr = res;
    console.log('getAllDevices ', res);
    var devices = res.devices;
    devices.forEach(function (item, i, arr) {
//                        var Device = new magic.MyDevice(item);
      // console.log('Device ', Device.deviceConnection);
      var myMarker = new CustomMarker(
        new google.maps.LatLng(devicesAr[i].Lat, devicesAr[i].Lng),
        map,
        {
          marker_id: 'myMarker',
          color: 'red'
        },
        item
      );
      google.maps.event.addListener(myMarker, 'click', function () {
        console.log('arg', arguments);
//                        map.setCenter(RdrMarker.getPosition());
//                        infowindow.setContent(contentStringRdr);
//                        infowindow.open(map,RdrMarker);
      });
//                        Device.createDeviceBlock(positions[i]);
    });
    promise.resolve(devices);

  }).fail(function (error) {
    promise.reject(error);
    console.error('error', error);
  });

  return promise
};
