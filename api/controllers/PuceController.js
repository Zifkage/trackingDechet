/**
 * PuceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

    if(!_.isString(req.param('caracteristique')) || !_.isString(req.param('idDechet'))){
      return res.badRequest();
    }

    Dechet.find({id: req.param('idDechet')}).exec(function (err, foundDechet) {
      if(err) return res.negotiate(err);
      if(!foundDechet) return res.notFound('ce dechet n\'existe pas');

      Puce.create({
        caracteristique: req.param('caracteristique'),
        dechet: req.param('idDechet')
      }).exec(function (err, createdPuce) {
        if(err) return res.negotiate(err);

        return res.ok()
      });

    });
    
  }

};

