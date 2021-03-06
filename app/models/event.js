var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var EventSchema = new Schema({
   name:     String,
   status:   String,
   message:  String,
   created: { type: Date, default: Date.now}
});

// create a model using it
var Event = mongoose.model('Event', EventSchema);
// make this available to our users in our Node applications
module.exports = Event;