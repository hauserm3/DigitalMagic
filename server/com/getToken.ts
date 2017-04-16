import {parseString} from "./parseString";
import * as http from 'http';
import {isArray} from "util";
/**
 * Created by Vlad on 4/15/2017.
 */

export let token;

let tokenTimestamp = 0;
export let username = "admin";

let password = "DjGaZ8AIxTUrbJXIFH5Q";
// let username = "BellCanada",
//     password = "vIgU9N1u1X4c7w6Ry0";
let auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

export function getToken(req, respnse, next){
  if(Date.now()-tokenTimestamp > 10*60*1000){
    token = null;
  }

  if(token){
    next();
    return;
  }

  const options = {
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

  let http_req = http.request(options, function(response) {
    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', function (chunk) {
      rawData += chunk;
      // console.log("body: " + chunk);
    });
    response.on('end', function() {
      // res.send(rawData);
      // console.log('end', rawData);

      parseString(rawData, function (err, result) {

        if(err){
          console.log(err);
          respnse.status(500).send(err);
          return
        }
        if(result.response && Array.isArray(result.response.responseClass) && result.response.responseClass[0]._){
          token = result.response.responseClass[0]._;
          console.log('token: ', token);
          tokenTimestamp = Date.now();
          next();
        }else  {
          console.log(result)
          respnse.status(500).send('cant get token');
        }

      });

    }).on('error', function(err) {
      console.error(err);
    });
  });

  // console.log('getTokenFunc');
  http_req.end();
}