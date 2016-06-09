var Donation = require('mongoose').model('Donation');

exports.create = function(req, res, next) {
   var donation = new Donation(req.body);
   
   donation.save(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(donation);
      }
   });
};

exports.list = function(req, res, next) {
   Donation.find({}, function(err, donations) {
      if (err) {
         return next(err);
      } else {
         res.json(donations);
      }
   });
};

exports.read = function(req, res) {
   res.json(req.donation);
};

exports.donationByID = function(req, res, next, id) {
   Donation.findOne({ _id: id}, function(err, donation) {
      if (err) {
         return next(err);
      } else {
         req.donation = donation;
         next();
      }   
   });
};

exports.update = function(req, res, next) {
   Donation.findByIdAndUpdate(req.donation.id, req.body, function(err, donation) {
      if (err) {
         return next(err);
      } else {
         res.json(donation);
      }
   });
};

exports.delete = function(req, res, next) {
   req.donation.remove(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(req.donation);
      }
   });
};
