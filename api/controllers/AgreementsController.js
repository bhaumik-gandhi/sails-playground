/**
 * AgreementsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res) {
    AgreementsService.create(req.body)
      .then(function(response) {
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  get: function(req, res) {
    AgreementsService.get()
      .then(function(response) {
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  filter: function(req, res) {
    AgreementsService.get(req.body)
      .then(function(response) {
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  delete: function(req, res) {
    AgreementsService.delete(req.body)
      .then(function(response) {
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  edit: function(req, res) {
    var id = req.body.id;
    delete req.body.id;
    AgreementsService.edit(id, req.body)
      .then(function(response) {
        res.ok(response);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
  
};
