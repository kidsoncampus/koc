/**
 * Created by LucyQiao on 5/16/16.
 * Created Notification API by Shuangyi Li on 6/1/16
 */

//var bodyParser = require('body-parser'); 	// get body-parser
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

//mongoose schemas
var User       = require('../models/user');
var ApplicationForm   = require('../models/applicationForm');
var Donation        = require('../models/donation');
var Event           = require('../models/event');
var DType           = require('../models/dType');
var Notification = require('../models/notification');

//REST API(s)
var applications  = require('./applicationFormAPI');
var donations    = require('./donationAPI');
var events       = require('./eventAPI');
var dTypes       = require('./dTypeAPI');
var notification = require('./notificationAPI');

// super secret for creating tokens
var superSecret = config.secret;

module.exports=function(app,express){
    var apiRouter=express.Router();

    apiRouter.route('/login')
        .post(function(req,res){
            //find the user
            User.findOne({
                email:req.body.email
            }).select('email password').exec(function(err,user){
                if(err) throw err;

                //no user with that email was found
                if(!user){
                    res.json({
                        success:false,
                        message:'Authentication failed. User not found.'
                    });
                }else if(user){
                    // check if password matches
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        });
                }else{
                        //if user is found and password is right
                        //create a token
                        var token=jwt.sign({
                                email: user.email
                            }, superSecret //,{
                            //expiresInMinutes: 60 // expires in 24 hours
                            //}
                        );

                        //return the information including token as JSON
                        res.json({
                            success:true,
                            message:'Enjoy your token!',
                            token:token
                        });
                    }
                }
            });
        });

    // route middleware to verify a token
    apiRouter.use(function(req, res, next) {
        // do logging
        console.log('Somebody just came to our app!');

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        console.log('token: ',token);
        var originalUrl = req.originalUrl;

        console.log('token:',token, req.originalUrl);

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, superSecret, function(err, decoded) {

                if (err) {
                    res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;

                    next(); // make sure we go to the next routes and don't stop here
                }
            });

        } else if(originalUrl === "/koc/signup" || originalUrl === "/koc/login"){
            next();
        } else {

            // if there is no token
            // return an HTTP response of 403 (access forbidden) and an error message
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // test route to make sure everything is working
    // accessed at GET http://localhost:3000/koc
    apiRouter.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    apiRouter.route('/signup')
        .post(function(req,res){
            //create a user (accessed at POST http://localhost:3000/koc/signup)
            var user=new User();//create a new instance of the user model
            user.email=req.body.email;//set the users email
            user.password=req.body.password;
            user.fName=req.body.fName;
            user.lName=req.body.lName;
            user.phone=req.body.phone;
            user.address=req.body.address;
            console.log(req.body);

            //save the user and check for errors;
            user.save(function(err){
                if(err){res.json({message:'fail'});}
                else{
                    res.json({message:'successful!'});
                }
            })
        });

    app.route('/user/:user_id')
        .get(function(req,res){
            User.findById(req.params.user_id,function(err,user){
                if(err) res.send(err);
                res.json(user);
            });
        })

        .put(function(req,res){
            User.findById(req.params.user_id,req.body,function(err,user){
                if(err) res.send(err);


                if(req.body.fName) user.fName=req.body.fName;
                if(req.body.lName) user.lName=req.body.lName;
                if(req.body.phone) user.phone=req.body.phone;
                if(req.body.address) user.address=req.body.address;

                //save the user
                user.save(function(err) {
                    if(err) res.send(err);

                    res.json({message:"User's profile is updated!"});
                });

            })
        })

    //applicationForm
    app.route('/waitinglist')
        .post(applications.create);


    app.route('/waitinglist/:applicationId')
        .get(applications.read)
        .put(applications.update)
        .delete(applications.delete);

    app.param('applicationId', applications.applicationByID);

    app.route('/users/:email')
        .get(function(req,res){
        if(req.params.email){
            ApplicationForm.find({email:req.params.email},function(err,docs){
                res.json(docs);
            });
        }
    });

    app.route('/adminDashboard')
        .get(applications.list);

    app.route('/emergencyContact')
        .get(applications.listAll);

    //donation REST routes
    app.route('/donations')
       .post(donations.create)
       .get(donations.list);
      
    app.route('/donations/:donationId')
       .get(donations.read)
       .put(donations.update)
       .delete(donations.delete);
   
    app.param('donationId', donations.donationByID);

    //post notification message
    app.route('/notificationAdmin')
        .post(notification.create);

    //get notification message
    app.route('/getNotification')
        .get(notification.notificationList); 
            
    //event REST routes
    app.route('/events')
       .post(events.create)
       .get(events.list);
      
    app.route('/events/:eventId')
       .get(events.read)
       .put(events.update)
       .delete(events.delete);

    app.param('eventId', events.eventByID);
    
    //dType REST routes
    app.route('/dTypes')
       .post(dTypes.create)
       .get(dTypes.list);
      
    app.route('/dTypes/:dTypeId')
       .get(dTypes.read)
       .put(dTypes.update)
       .delete(dTypes.delete);

    app.param('dTypeId', dTypes.dTypeByID);
    
    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        User.findOne({email: req.decoded.email}, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    });

    return apiRouter;

};