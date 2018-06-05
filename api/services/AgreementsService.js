var q = require("q");
var moment = require("moment");

function AgreementsService() {
  function _create(data) {
    var deferred = q.defer();
    Agreements.create(data)
      .then(function(res) {
        deferred.resolve(res);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function _get(data) {
    var deferred = q.defer();
    var criteria = {};

    if (data && data.name) {
      if (data.operation === "contains") {
        criteria.name = {
          like: "%" + data.name + "%"
        };
      } else if (data.operation === "equals") {
        criteria.name = data.name;
      } else if (data.operation === "not_equals") {
        criteria.name = {
          "!": data.name
        };
      }
    }

    if (data && data.value) {
      if (data.operation === "equals") {
        criteria.value = data.value;
      } else if (data.operation === "not_equals") {
        criteria.value = {
          "!": data.value
        };
      } else if (data.operation === "gt_equals") {
        criteria.value = {
          ">=": parseInt(data.value)
        };
      } else if (data.operation === "lt_equals") {
        criteria.value = {
          "<=": parseInt(data.value)
        };
      }
    }

    if (data && data.status) {
      if (data.operation === "equals") {
        criteria.value = data.value;
      } else if (data.operation === "not_equals") {
        criteria.value = {
          "!": data.value
        };
      }
    }

    if (data && data.startDate) {
      var formatedDate = moment(data.startDate).format("DD/MM/YYYY");
      if (data.operation === "equals") {
        var startDate = moment(data.startDate)
          .subtract(1, "days")
          .format("DD/MM/YYYY");
        var endDate = moment(data.startDate)
          .add(1, "days")
          .format("DD/MM/YYYY");
        criteria.startDate = {
          ">": new Date(startDate),
          "<": new Date(endDate)
        };
      } else if (data.operation === "gt_equals") {
        criteria.startDate = {
          ">=": new Date(formatedDate)
        };
      } else if (data.operation === "lt_equals") {
        criteria.startDate = {
          "<=": new Date(formatedDate)
        };
      }
    }

    if (data && data.endDate) {
      var formatedDate = moment(data.endDate).format("DD/MM/YYYY");
      if (data.operation === "equals") {
        var endDate = moment(data.endDate)
          .subtract(1, "days")
          .format("DD/MM/YYYY");
        var endDate = moment(data.endDate)
          .add(1, "days")
          .format("DD/MM/YYYY");
        criteria.endDate = {
          ">": new Date(endDate),
          "<": new Date(endDate)
        };
      } else if (data.operation === "gt_equals") {
        criteria.endDate = {
          ">=": new Date(formatedDate)
        };
      } else if (data.operation === "lt_equals") {
        criteria.endDate = {
          "<=": new Date(formatedDate)
        };
      }
    }

    Agreements.find(criteria)
      .then(function(res) {
        deferred.resolve(res);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function _delete(id) {
    var deferred = q.defer();
    Agreements.destroy({ id: id })
      .then(function(res) {
        deferred.resolve(res);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function _edit(id, data) {
    var deferred = q.defer();
    Agreements.update({ id: id }, data)
      .then(function(result) {
        deferred.resolve(result);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  return {
    create: _create,
    get: _get,
    delete: _delete,
    edit: _edit
  };
}

module.exports = AgreementsService();
