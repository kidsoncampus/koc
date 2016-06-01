/**
 * Created by LucyQiao on 5/26/16.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApplicationFormSchema = new Schema({
    email: String,
    submitDate:Date,
    chFname:String,
    chLname:String,
    chGender:String,
    chBirthday:Date,
    program:String,
    eEmail: String,
    eFname:String,
    eLname:String,
    ePhone:Number,
    eAddress:String,
    perferredStartDate: Date,
    priorityLevel1:String,
    priorityLevel2:String
});

var ApplicationForm = mongoose.model('ApplicationForm', ApplicationFormSchema);

module.exports= ApplicationForm;