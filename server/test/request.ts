import {parseString} from "../com/parseString";
import * as Promise from 'bluebird';

var querystring = require('querystring');
var http = require('http');

//authorization
let username = "admin",
    password = "DjGaZ8AIxTUrbJXIFH5Q";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

let token;

//getAuthToken
var options = {
  host: '34.196.180.158',
  port: 7001,
  path: '/MagicInfo/openapi/getAuthToken',
  method: 'GET',
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':'gzip, deflate, sdch',
    'Accept-Language':'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
    'Connection':'keep-alive',
    'Upgrade-Insecure-Requests':1,
    // 'Content-Length': Buffer.byteLength(data),
    "Authorization" : auth,
    'User-Agent':'Mozilla/5.0'
  }
};

var http_req = http.request(options, function(response) {
  response.setEncoding('utf8');
  let rawData = '';
  response.on('data', function (chunk) {
    rawData += chunk;
    // console.log("body: " + chunk);
  });
  response.on('end', function() {
    // console.log('rawData', rawData);
    parseString(rawData, function (err, result) {

      if(err){
        console.log(err);
        //respnse.status(500).send(err);
        return
      }
      if(result.response && Array.isArray(result.response.responseClass) && result.response.responseClass[0]._){
        token = result.response.responseClass[0]._;
        console.log('token: ', token);
        getDeviceListWithDeviceType('-1',token);
        // next();
      }else  {
        token = null;
        console.error(result)
        // respnse.status(500).send('cant get token');
      }

    });
  }).on('error', function(err) {
    console.error(err);
  });
});

// http_req.write();
http_req.end();

export function myPost(data){

  return new Promise(function(resolve,reject){
    if(!data.service){
      reject('service must be in postData');
      return;
    }


    // data.token = token;
    let payload =  querystring.stringify(data);
    payload += '&token='+token;
    let options = {
      host: '34.196.180.158',
      port: 7001,
      path: '/MagicInfo/openapi/open',
      method: 'POST',
      headers: {
        'Connection':'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent':'Mozilla/5.0'
      }
    };

    console.log('payload', payload);
    let http_req = http.request(options, function(response) {
      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', function (chunk) {
        rawData += chunk;
        // console.log("body: " + chunk);
      });
      response.on('end', function() {
        parseString(rawData, function (err, result) {
          console.log('post res pars', result);
          resolve(result);
        });
        console.log('post rawData', rawData);
      }).on('error', function(err) {
        reject(err);
        console.error('error myPost ',err);
      });
    });

    http_req.on('error',function (err) {
      console.error('error myPost ',err);
    })
    http_req.write(payload);
    http_req.end();
  });

}

function getDeviceListWithDeviceType(groupId, token){
  let data  = {
    service:'PremiumDeviceService.getDeviceListWithDeviceType',
    condition: '<DeviceCondition><statusViewMode>device_status_view_all</statusViewMode></DeviceCondition>',
    deviceType:'ALL'
  };

  data.token = token;
  let payload =  querystring.stringify(data);
  // payload += '&token='+token;
  let options = {
    host: '34.196.180.158',
    port: 7001,
    path: '/MagicInfo/openapi/open',
    method: 'POST',
    headers: {
      'Connection':'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(payload),
      'User-Agent':'Mozilla/5.0'
    }
  };

  console.log('payload', payload);
  let http_req = http.request(options, function(response) {
    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', function (chunk) {
      rawData += chunk;
      // console.log("body: " + chunk);
    });
    response.on('end', function() {
      parseString(rawData, function (err, result) {
        console.log('post res pars', result);
        // resolve(result);
      });
      console.log('post rawData', rawData);
    }).on('error', function(err) {
      // reject(err);
      console.error('error myPost ',err);
    });
  });

  http_req.on('error',function (err) {
    console.error('error myPost ',err);
  });
  http_req.write(payload);
  http_req.end();
};

  // return myPost(payload).then(function (res:any) {
  //   console.log(res);
  //   let out:any = {};
  //   out.devices = res.response.responseClass[0].resultList[0].Device;
  //   console.log('getAllDevices', out.devices);
  //   return out;
  // }).catch(function (err) {
  //   console.log('getDeviceListWithDeviceType error',err);
  //   return err;
  // });
// }