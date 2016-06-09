var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var EventSchema = new Schema({
   name:     String,
   status:   String,
   header:   String,
   greeting: String,
   author:   String,
   line_1:   String,
   line_2:   String,
   line_3:   String,
   color:    String,
   textLeft: String,
   textTop:  String,
   image:    String,
   created: { type: Date, default: Date.now}
});

// create a model using it
var Event = mongoose.model('Event', EventSchema);
// make this available to our users in our Node applications
module.exports = Event;