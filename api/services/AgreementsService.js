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

    if (data && data.constructor === Array) {
      data.forEach(function(filter) {
        if (filter && filter.name) {
          if (filter.operation === "contains") {
            criteria.name = {
              like: "%" + filter.name + "%"
            };
          } else if (filter.operation === "equals") {
            criteria.name = filter.name;
          } else if (filter.operation === "not_equals") {
            criteria.name = {
              "!": filter.name
            };
          }
        }

        if (filter && filter.value) {
          if (filter.operation === "equals") {
            criteria.value = parseInt(filter.value);
          } else if (filter.operation === "not_equals") {
            criteria.value = {
              "!": parseInt(filter.value)
            };
          } else if (filter.operation === "gt_equals") {
            criteria.value = {
              ">=": parseInt(filter.value)
            };
          } else if (filter.operation === "lt_equals") {
            criteria.value = {
              "<=": parseInt(filter.value)
            };
          }
        }

        if (filter && filter.status) {
          if (filter.operation === "equals") {
            criteria.status = filter.status;
          } else if (filter.operation === "not_equals") {
            criteria.status = {
              "!": filter.status
            };
          }
        }

        if (filter && filter.startDate) {
          if (filter.operation === "equals") {
            criteria.startDate = filter.startDate;
          } else if (filter.operation === "not_equals") {
            criteria.startDate = {
              "!": filter.startDate
            };
          } else if (filter.operation === "gt_equals") {
            criteria.startDate = {
              ">=": filter.startDate
            };
          } else if (filter.operation === "lt_equals") {
            criteria.startDate = {
              "<=": filter.startDate
            };
          }
        }

        if (filter && filter.endDate) {
          if (filter.operation === "equals") {
            criteria.endDate = filter.endDate;
          } else if (filter.operation === "not_equals") {
            criteria.endDate = {
              "!": filter.endDate
            };
          } else if (filter.operation === "gt_equals") {
            criteria.endDate = {
              ">=": filter.endDate
            };
          } else if (filter.operation === "lt_equals") {
            criteria.endDate = {
              "<=": filter.endDate
            };
          }
        }
      })
    }

    if (data && data.id) {
      criteria.id = data.id;
    }


    if (sort) {
      sort = sort;
    }
    // let keys = Object.keys(criteria);

    // if (data && data.operation && !keys.length) {
    //   criteria = {id: 'null'}
    // }

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
