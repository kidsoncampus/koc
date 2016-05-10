// BASE SETUP
// =============================================================================
//call the package we need
var express = require('express'); // call express
var app = express();// define our app using express
var bodyParser = require('body-parser');
//That will grab the mongoose package and connect to our remote database hosted by Modulus.
var morgan = require('morgan');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/Apipar4i');
var port = process.env.PORT || 3000;        // set our port

var User=require('./app/models/user');

var jwt =require('jsonwebtoken');//grap the jsonwebtoken package
var superSecret = 'ilovescotchscotchyscotchscotch';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	 res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
	 next();
	 });

// log all requests to the console
app.use(morgan('dev'));
//set the publci folder to serve public assets
app.use(express.static(__dirname + '/public'));
// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// route middleware to verify a token
router.use(function(req,res,next){

	console.log('verify first?')

	//check header or url parameters or post parameters for token
	var token=req.body.token || req.query.token || req.headers['x-access-token'];

	console.log('token: ',token);
	var originalUrl = req.originalUrl;

	console.log('token:',token, req.originalUrl)
	//decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token,superSecret,function(err,decode){
			if(err){
				return res.status(403).send({
					success:false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.decode=decode;
				next();
			}
		});
	} else if(originalUrl === "/koc/signup" || originalUrl === "/koc/login") {
		next();
	} else {
		//if there is no token
		//return an HTTP response of 403(access forbidden) and an error message
		return res.status(403).send({
			success:false,
			message: 'No token provided.'
		});
	}
	//next();// make sure we go to the next routes and don't stop here
});

//route to authenticate a user (POST http://localhost:3000/koc/login)
router.post('/login',function(req,res){
	//find the user
	//select the email and pw explicitly

	console.log('login???')

	User.findOne({
		email:req.body.email
	}).select('email password').exec(function(err,user){
		if (err) throw err;
		//no user with that email was found

		if(!user){
			res.json({
				success:false,
				message:'Authentication failed. User not found.'
			});
		} else {
			//check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success:false,
					message:'Authentication failed. Wrong password.'
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


router.post('/test', function(req,res) {
	console.log('test second?')

	res.json({
		success:true
	});
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/koc)
router.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// ----------------------------------------------------
router.route('/signup')
	//create a user (accessed at POST http://localhost:3000/koc/signup)
	.post(function(req,res){
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

//on routes that end in /koc/:user_id
router.route('/dashboard/:user_id')
	//get the user with that id
    //(accessed at GET http://localhost:3000/koc/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id,function(err,user){
			if(err) res.send(err);

			//return that user
			res.json(user);
		});
	})


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /signup
app.use('/koc', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);







