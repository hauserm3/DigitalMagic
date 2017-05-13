import {parseString} from "./parseString";
import {token, username} from "./getToken";
import * as Promise from 'bluebird';
let querystring = require('querystring');
import * as http from 'http';
/**
 * Created by Vlad on 4/15/2017.
 */

export function myPost(data){

  return new Promise(function(resolve,reject){
    if(!data.service){
      reject('service must be in postData');
      return;
    }


    data.token = token;
   let payload =  querystring.stringify(data);
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