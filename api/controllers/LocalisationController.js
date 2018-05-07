/**
 * LocalisationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
  }

};

