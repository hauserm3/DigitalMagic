import {CustomMarker} from "./myCustomGoogleMapMarker";
import LatLng = google.maps.LatLng;

/**
 * Created by Vlad on 4/23/2017.
 */
export function getInitData(map, devicesAr) {
//            $.get('/api/getOrganizationList').done(function (res) {
//                console.log('getOrganizationList', res);
//                res.forEach(function (item, i, arr) {
//                    $('#OrganizationList>ul').append(
//                        $('<li>').append(
//                            $('<a>').attr('href', item.group_id[0]).text(item.group_name[0] + ' (id=' + item.group_id[0] + ')')));
//                });
//            }).fail(function (error) {
//                console.error('error', error);
//            });

  $.get('/api/getOrganizationList').done(function (res) {
    console.log('getOrganizationList', res);
    res.forEach(function (item, i, arr) {
      $('.dropdown-menu').append(
        $('<a>').addClass('dropdown-item').attr('href', item.group_id[0]).text(item.group_name[0] + ' (id=' + item.group_id[0] + ')'));
    });
  }).fail(function (error) {
    console.error('error', error);
  });

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

  }).fail(function (error) {
    console.error('error', error);
  });
};
