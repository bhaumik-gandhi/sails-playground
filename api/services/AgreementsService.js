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

    console.log(data);

    var deferred = q.defer();
    var criteria = {};
    var sort = "createdAt";

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
        criteria.value = parseInt(data.value);
      } else if (data.operation === "not_equals") {
        criteria.value = {
          "!": parseInt(data.value)
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
        criteria.status = data.status;
      } else if (data.operation === "not_equals") {
        criteria.status = {
          "!": data.status
        };
      }
    }

    if (data && data.startDate) {
      if (data.operation === "equals") {
        criteria.startDate = data.startDate;
      } else if (data.operation === "not_equals") {
        criteria.startDate = {
          "!": data.startDate
        };
      } else if (data.operation === "gt_equals") {
        criteria.startDate = {
          ">=": data.startDate
        };
      } else if (data.operation === "lt_equals") {
        criteria.startDate = {
          "<=": data.startDate
        };
      }
    }

    if (data && data.endDate) {
      if (data.operation === "equals") {
        criteria.endDate = data.endDate;
      } else if (data.operation === "not_equals") {
        criteria.endDate = {
          "!": data.endDate
        };
      } else if (data.operation === "gt_equals") {
        criteria.endDate = {
          ">=": data.endDate
        };
      } else if (data.operation === "lt_equals") {
        criteria.endDate = {
          "<=": data.endDate
        };
      }
    }

    // if (data && data.startDate) {
    //   var formatedDate = moment(data.startDate, 'YYYY-MM-DD HH:mm:ss').toDate();
    //   if (data.operation === "equals") {
    //     var startDate = moment(data.startDate, 'YYYY-MM-DD HH:mm:ss')
    //       .subtract(1, "days")
    //       .format("DD/MM/YYYY");
    //     var endDate = moment(data.startDate, 'YYYY-MM-DD HH:mm:ss')
    //       .add(1, "days")
    //       .format("DD/MM/YYYY");
    //     criteria.startDate = {
    //       ">": new Date(startDate),
    //       "<": new Date(endDate)
    //     };
    //   } else if (data.operation === "gt_equals") {
    //     criteria.startDate = {
    //       ">=": formatedDate
    //     };
    //   } else if (data.operation === "lt_equals") {
    //     criteria.startDate = {
    //       "<=": new Date(formatedDate)
    //     };
    //   }
    // }

    // if (data && data.endDate) {
    //   var formatedDate = moment(data.endDate, 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY");
    //   if (data.operation === "equals") {
    //     var startDate = moment(data.endDate, 'YYYY-MM-DD HH:mm:ss')
    //       .subtract(1, "days")
    //       .format("DD/MM/YYYY");
    //     var endDate = moment(data.endDate, 'YYYY-MM-DD HH:mm:ss')
    //       .add(1, "days")
    //       .format("DD/MM/YYYY");
    //     criteria.endDate = {
    //       ">": new Date(startDate),
    //       "<": new Date(endDate)
    //     };
    //   } else if (data.operation === "gt_equals") {
    //     criteria.endDate = {
    //       ">=": new Date(formatedDate)
    //     };
    //   } else if (data.operation === "lt_equals") {
    //     criteria.endDate = {
    //       "<=": new Date(formatedDate)
    //     };
    //   }
    // }

    if (sort) {
      sort = sort;
    }
    let keys = Object.keys(criteria);

    if (data && data.operation && !keys.length) {
      criteria = {id: 'null'}
    }

    console.log(criteria);

    Agreements.find(criteria)
      .sort(sort + " DESC")
      .then(function(res) {
        deferred.resolve(res);
      })
      .catch(function(error) {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  function _delete(ids) {
    var deferred = q.defer();
    Agreements.destroy({ id: ids })
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
