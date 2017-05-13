/**
 * Created by Vlad on 4/23/2017.
 */

import {MyDevice} from './myDevice';

import {initModal, MyModal} from "../modal/myModal";
import {CustomMarker} from "./myCustomGoogleMapMarker";
import {initDevicesOnGoogleMap} from "./initDevicesOnGoogleMap";
import {getOrganizations} from "./getOrganizations";

declare var globalDispather$:JQuery;

var initialize = function () {
  // console.log('initialize func');

  let devicesAr = [
    {Lat: 43.799632, Lng: -79.517201},
    {Lat: 43.793506, Lng: -79.23994},
    {Lat: 43.710955, Lng: -79.28338},
    {Lat: 43.732221, Lng: -79.475403}
  ];
  let myLatlng = new google.maps.LatLng(43.734022, -79.333717);

  let mapOptions = {
    zoom: 12,
    center: myLatlng,
    disableDefaultUI: true
  };

  let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


  initDevicesOnGoogleMap(map, devicesAr);

  initModal();
  getOrganizations($('#OrganizationsList'));
//            setInterval(function(){getData()},10000);
};

$(document).ready(function () {
  initialize();
  // google.maps.event.addDomListener(window, 'load', initialize);
});