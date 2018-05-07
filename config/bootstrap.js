/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  // var createdDechet1 = Dechet.create({
  //   label: 'Label du dechet1',
  //   type: 'Solide'
  // }).fetch().exec(function(){
  //
  //
  //   Puce.create({
  //     caracteristique: 'caract 1',
  //     dechet: createdDechet1.id
  //   }).exec(function(){
  //
  //
  //     var createdDechet2 = Dechet.create({
  //       label: 'Label du dechet2',
  //       type: 'Solide'
  //     }).fetch().exec(function(){
  //
  //
  //       Puce.create({
  //         caracteristique: 'caract 2',
  //         dechet: createdDechet2.id
  //       }).exec(function(){
  //
  //         return done();
  //       });
  //     });
  //   });
  // });

  return await done();
};
