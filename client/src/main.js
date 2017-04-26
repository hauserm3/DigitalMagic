/**
 * Created by Vlad on 4/23/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myModal_1 = require("./myModal");
var initDevicesOnGoogleMap_1 = require("./initDevicesOnGoogleMap");
var getOrganizations_1 = require("./getOrganizations");
var initialize = function () {
    var devicesAr = [
        { Lat: 43.799632, Lng: -79.517201 },
        { Lat: 43.793506, Lng: -79.23994 },
        { Lat: 43.710955, Lng: -79.28338 },
        { Lat: 43.732221, Lng: -79.475403 }
    ];
    var myLatlng = new google.maps.LatLng(43.734022, -79.333717);
    var mapOptions = {
        zoom: 12,
        center: myLatlng,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    initDevicesOnGoogleMap_1.initDevicesOnGoogleMap(map, devicesAr);
    myModal_1.initModal();
    getOrganizations_1.getOrganizations($('#OrganizationsList'));
    //            setInterval(function(){getData()},10000);
};
google.maps.event.addDomListener(window, 'load', initialize);
