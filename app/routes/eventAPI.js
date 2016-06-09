var Event = require('mongoose').model('Event');

exports.create = function(req, res, next) {
   var event = new Event(req.body);
   
   event.save(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(event);
      }
   });
};

exports.list = function(req, res, next) {
   Event.find({}, function(err, events) {
      if (err) {
         return next(err);
      } else {
         res.json(events);
      }
   });
};

exports.read = function(req, res) {
   res.json(req.event);
};

exports.eventByID = function(req, res, next, id) {
   Event.findOne({ _id: id}, function(err, event) {
      if (err) {
         return next(err);
      } else {
         req.event = event;
         next();
      }   
   });
};

exports.update = function(req, res, next) {
   Event.findByIdAndUpdate(req.event.id, req.body, function(err, event) {
      if (err) {
         return next(err);
      } else {
         res.json(event);
      }
   });
};

exports.delete = function(req, res, next) {
   req.event.remove(function(err) {
      if (err) {
         return next(err);
      } else {
         res.json(req.event);
      }
   });
};
