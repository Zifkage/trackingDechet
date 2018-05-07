/**
 * DechetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: function (req, res) {
    if(!_.isString('label') || !_.isString('type')){
      return res.badRequest('label et type requis');
    }

    Dechet.create({
      label: req.param('label'),
      type: req.param('type')
    }).exec(function (err, createDechet) {
      if(err) return res.negotiate(err);

      return res.ok();
  });
  }

};

