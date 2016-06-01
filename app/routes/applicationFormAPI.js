/**
 * Created by LucyQiao on 5/26/16.
 */
var ApplicationForm = require('mongoose').model('ApplicationForm');

exports.create = function(req, res, next) {
    var application = new ApplicationForm(req.body);

    application.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(application);
        }
    });
};

//get all applications info
exports.list = function(req, res, next) {
    ApplicationForm.find({}, function(err, applications) {
        if (err) {
            return next(err);
        } else {
            res.json(applications);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.application);
};
exports.applicationByID = function(req, res, next, id) {
    ApplicationForm.findOne({ _id: id}, function(err, application) {
        if (err) {
            return next(err);
        } else {
            req.application = application;
            next();
        }
    });
};

