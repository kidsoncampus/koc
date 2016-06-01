/**
 * Created by LucyQiao on 5/16/16.
 */
//var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var ApplicationForm   = require('../models/applicationForm');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');
var applications  = require('./applicationFormAPI');


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

    //applicationForm
    app.route('/waitinglist')
        .post(applications.create)
        .get(applications.list);

    app.route('/waitinglist/:applicationId')
        .get(applications.read);

    app.param('applicationId', applications.applicationByID);

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
        User.findOne({email: req.decoded.email}, function(err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    });

    return apiRouter;

};