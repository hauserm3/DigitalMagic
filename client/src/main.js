/**
 * Created by Vlad on 4/23/2017.
 */
"use strict";
exports.__esModule = true;
var myModal_1 = require("./myModal");
var geInitData_1 = require("./geInitData");
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
    geInitData_1.getInitData(map, devicesAr);
    //            setInterval(function(){getData()},10000);
};
google.maps.event.addDomListener(window, 'load', initialize);
//# sourceMappingURL=main.js.map