/**
 * PuceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');
const moment = require('moment');
const md5 = require('md5');

module.exports = {

  fetch: function (req, res) {
    Puce.find()
      .populate('localisations')
      .populate('dechet')
      .exec(function (err, foundPuce) {
        if(err) return res.negotiate(err);
        if(!foundPuce) return res.notFound();
        return res.json(foundPuce)
    });
  },

  fetchOne: function (req, res) {

    if(!_.isString(req.param('id'))) return res.badRequest();

    Puce.findOne({id: req.param('id')})
      .populate('localisations')
      .populate('dechet')
      .exec(function (err, foundPuce) {
        if(err) return res.negotiate(err);
        if(!foundPuce) return res.notFound();
        return res.json(foundPuce)
    });
  },

  create: function (req, res) {

    if(!_.isString(req.param('caracteristique'))
      || !_.isString(req.param('idPuce'))
      || !_.isString(req.param('type'))
      || !_.isString(req.param('label'))
      ){
      return res.badRequest();
    }

      Puce.create({
        caracteristique: req.param('caracteristique'),
        idPuce: req.param('idPuce'),
        type: req.param('type'),
        label: req.param('label')
      }).exec(function (err) {
        if(err) return res.negotiate(err);

        return res.ok()
      });

  },

  apikey: function (req, res) {

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



    const param = {
      method : 'jimi.oauth.token.get',
      timestamp :  gmt,
      app_key : '8FB345B8693CCD00E75BA6C66AC41BC3',
      v : '0.9',
      format : 'json',
      sign_method: 'md5',
      user_id: 'BLOLAB MA',
      user_pwd_md5: md5('bl0lab_tracks0lid'),
      expires_in: '7200'
    };
    const secret = '23168059ed544d50b6ab5431ae23806f';
    let sign = Object.keys(param).sort().reduce((sign, key) => sign + key+'='+param[key], '');
    sign = secret + sign;
    sign = sign + secret;
    sign = md5(sign);
    param.sign = sign;
    let query = Object.keys(param).reduce((query, key) =>{
      return query + '' + key+'='+param[key]+'&';
    } , '?');
    query = query.split('&');
    query.pop();
    query = query.join('&');
    axios.get('http://open.10000track.com/route/rest'+query)
      .then(function (response) {
        console.log(response.data.result.accessToken);
        sails.config.custom.trackAccessKey = response.data.result.accessToken;
        return res.json(response.data);
      })
      .catch(function (err) {
        return res.negotiate(err)
      });

  }

};

