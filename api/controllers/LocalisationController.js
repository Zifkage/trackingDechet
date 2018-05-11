/**
 * LocalisationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');
const moment = require('moment');
const md5 = require('md5');

module.exports = {

  locate: function (req, res) {

    if(!_.isString(req.param('id')) || !_.isString(req.param('lat')) || !_.isString(req.param('long'))){
      return res.badRequest();
    }

    Puce.findOne({id: parseInt(req.param('id'))}).exec(function(err, foundPuce){
      if(err){
        return res.negotiate(err);
      }

      if(!foundPuce) return res.notFound();

      Localisation.create({
        latitude: req.param('lat'),
        longitude: req.param('long'),
        puce: foundPuce.id
      }).exec(function(err,  createdLoc){
        if(err){
          return res.negotiate(err);
        }

        return res.json(createdLoc);
      });
    });
  },

  getLocalisation: function (req, res) {

    let timestamp = moment().format().split('T').join(' ').split('+')[0];
    let date = moment().format().split('T')[0];
    let hour = timestamp.split(' ')[1].split(':')[0];
    hour = parseInt(hour);
    hour = hour - 1;
    if(hour < 10){
      hour = '0'+hour
    }

    let newHour = timestamp.split(' ')[1].split(':');
    newHour[0] = hour;
    newHour = newHour.join(':');

    let gmt = date + ' ' + newHour;

    let param = {
      method: 'jimi.user.device.location.list',
      access_token: sails.config.custom.trackAccessKey,
      target: 'BLOLAB MA',
      app_key : '8FB345B8693CCD00E75BA6C66AC41BC3',
      timestamp :  gmt,
      v : '0.9',
      format : 'json',
      sign_method: 'md5',
      user_id: 'BLOLAB MA',
      user_pwd_md5: md5('bl0lab_tracks0lid'),
      expires_in: '7200'
    };
    const paramKey = Object.keys(param);
    let query = '?';
    for(let i = 0; i < paramKey.length; i++){
      if(i < paramKey.length){
        query = query + paramKey[i] + '=' + param[paramKey[i]] + '&';
      }else query = query + paramKey[i] + '=' + param[paramKey[i]];
    }

    let data = [];

    axios.get('http://open.10000track.com/route/rest'+query)
      .then(function (response) {
        console.log(response.data);
        for(let i = 0; i < response.data.result.length; i++){
          data.push({
            idPuce : response.data.result[i].imei,
            lat: response.data.result[i].lat,
            lng: response.data.result[i].lng
          })
        }

        async.each(data, function (d, callback) {
          Puce.findOne({idPuce: d.idPuce}).exec(function (err, foundPuce) {
            if(!foundPuce) callback();
            Localisation.create({
              latitude: d.lat,
              longitude: d.lng,
              puce: foundPuce.id
            }).exec(function () {
              callback();
            });
          });
        }, function (err) {
          if(err){
            return res.negotiate(err);
          }else {
            return res.ok();
          }
        });
      })
      .catch(function (err) {
        return res.negotiate(err)
      });
  },

  getTrackData: function (req, res) {

    if(!_.isString(req.param('imei'))
      || !_.isString(req.param('begin'))
      || !_.isString(req.param('end'))
    ){
      return res.badRequest();
    }

    let timestamp = moment().format().split('T').join(' ').split('+')[0];
    let date = moment().format().split('T')[0];
    let hour = timestamp.split(' ')[1].split(':')[0];
    hour = parseInt(hour);
    hour = hour - 1;
    if(hour < 10){
      hour = '0'+hour
    }

    let newHour = timestamp.split(' ')[1].split(':');
    newHour[0] = hour;
    newHour = newHour.join(':');

    let gmt = date + ' ' + newHour;

    let param = {
      method: 'jimi.device.track.list',
      access_token: sails.config.custom.trackAccessKey,
      target: 'BLOLAB MA',
      app_key : '8FB345B8693CCD00E75BA6C66AC41BC3',
      timestamp :  gmt,
      v : '0.9',
      format : 'json',
      sign_method: 'md5',
      user_id: 'BLOLAB MA',
      user_pwd_md5: md5('bl0lab_tracks0lid'),
      expires_in: '7200',
      begin_time: req.param('begin'),
      end_time: req.param('end'),
      imei: req.param('imei')
    };
    const paramKey = Object.keys(param);
    let query = '?';
    for(let i = 0; i < paramKey.length; i++){
      if(i < paramKey.length){
        query = query + paramKey[i] + '=' + param[paramKey[i]] + '&';
      }else query = query + paramKey[i] + '=' + param[paramKey[i]];
    }

    axios.get('http://open.10000track.com/route/rest'+query)
      .then(function (response) {
        console.log(response.data);
        return res.json(response.data);
      });
  }

};

