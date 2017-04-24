/**
 * Created by Vlad on 4/23/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myModal_1 = require("./myModal");
var myCustomGoogleMapMarker_1 = require("./myCustomGoogleMapMarker");
var devices_arr;
var modal;
globalDispather$.on('thumbClick', function (evt, obj) {
    if (modal)
        modal.$view.remove();
    modal = new myModal_1.MyModal(obj);
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
//        var positions = [
//            {
//                left: '200px',
//                top: '80px'
//            },
//            {
//                left: '860px',
//                top: '80px'
//            },
//            {
//                left: '750px',
//                top: '420px'
//            },
//            {
//                left: '310px',
//                top: '310px'
//            }
//
//        ];
//        $(document).ready(function () {
var initialize = function () {
    var LatLng = [
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
    var getData = function () {
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
                $('.dropdown-menu').append($('<a>').addClass('dropdown-item').attr('href', item.group_id[0]).text(item.group_name[0] + ' (id=' + item.group_id[0] + ')'));
            });
        }).fail(function (error) {
            console.error('error', error);
        });
        $.get('/api/getDevices/-1').done(function (res) {
            devices_arr = res;
            console.log('getAllDevices ', res);
            var devices = res.devices;
            devices.forEach(function (item, i, arr) {
                //                        var Device = new magic.MyDevice(item);
                // console.log('Device ', Device.deviceConnection);
                var myMarker = new myCustomGoogleMapMarker_1.CustomMarker(new google.maps.LatLng(LatLng[i].Lat, LatLng[i].Lng), map, {
                    marker_id: 'myMarker',
                    color: 'red'
                }, item);
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
    getData();
    //            setInterval(function(){getData()},10000);
};
google.maps.event.addDomListener(window, 'load', initialize);
