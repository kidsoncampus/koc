/**
 *Created by Lixing Zhao on 05/17/16 
 */

var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

var DonationSchema = new Schema({
   event:       String,
   fName:       String,
   lName:       String,
   email:       String, 
   type:        String,
   quantity:    Number,
   description: String,
   created: { type: Date, default: Date.now}
});

// create a model using it
var Donation = mongoose.model('Donation', DonationSchema);
// make this available to our users in our Node applications
module.exports = Donation;