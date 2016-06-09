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
    ApplicationForm.find({status:'Pending'}, function(err, applications) {
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

exports.update = function(req, res, next) {
    ApplicationForm.findByIdAndUpdate(req.application.id, req.body, function(err, application) {
        if (err) {
            return next(err);
        } else {
            res.json(application);
        }
    });
};

exports.delete=function(req,res,next){
    req.application.remove(function(err){
        if(err){
            return next(err);
        }else{
            res.json(req.application);
        }
    });
};


