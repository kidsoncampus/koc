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
exports.listAll=function(req,res,next){
    ApplicationForm.find(function(err,applications){
        if(err){
            return next(err);
        }else{
            res.json(applications);
        }

    });
};
//get all Pending applications info
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

exports.update = function(req, res) {
    ApplicationForm.findByIdAndUpdate(req.application.id, req.body, function(err, application) {
        if(err) res.send(err);

        if(req.body.eEmail) application.eEmail=req.body.eEmail;
        if(req.body.eFname) application.eFname=req.body.eFname;
        if(req.body.eLname) application.eLname=req.body.eLname;
        if(req.body.ePhone) application.ePhone=req.body.ePhone;
        if(req.body.eAddress) application.eAddress=req.body.eAddress;

        //save the application
        application.save(function(err) {
            if(err) res.send(err);

            res.json({message:'Emergency Contact updated!'});
        });
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


