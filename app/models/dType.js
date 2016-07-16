/**
 *Created by Lixing Zhao on 07/04/16 
 */

var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var DTypeSchema = new Schema({
   name:        String,
   status:      String,
   information: String,
   created: { type: Date, default: Date.now}
});

// create a model using it
var DType = mongoose.model('DType', DTypeSchema);
// make this available to our users in our Node applications
module.exports = DType;