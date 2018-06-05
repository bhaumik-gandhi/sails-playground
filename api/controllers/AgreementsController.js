/**
 * AgreementsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    console.log(req.body);
    
    Agreements.create(req.body)
      .then(function(response) {
        console.log(response);
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      }) 
  }

};

