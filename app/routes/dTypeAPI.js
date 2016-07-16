/**
 *Created by Lixing Zhao on 07/04/16 
 */

var DType = require('mongoose').model('DType');

exports.create = function(req, res, next) {
   var dType = new DType(req.body);
   
   dType.save(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(dType);
      }
   });
};

exports.list = function(req, res, next) {
   DType.find({}, function(err, dTypes) {
      if (err) {
         return next(err);
      } else {
         res.json(dTypes);
      }
   });
};

exports.read = function(req, res) {
   res.json(req.dType);
};

exports.dTypeByID = function(req, res, next, id) {
   DType.findOne({ _id: id}, function(err, dType) {
      if (err) {
         return next(err);
      } else {
         req.dType = dType;
         next();
      }   
   });
};

exports.update = function(req, res, next) {
   DType.findByIdAndUpdate(req.dType.id, req.body, function(err, dType) {
      if (err) {
         return next(err);
      } else {
         res.json(dType);
      }
   });
};

exports.delete = function(req, res, next) {
   req.dType.remove(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(req.dType);
      }
   });
};
