// BASE SETUP
// =============================================================================
//call the package we need
var express = require('express'); // call express
var app = express();// define our app using express
var bodyParser = require('body-parser');
//That will grab the mongoose package and connect to our remote database hosted by Modulus.
var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@jello.modulusmongo.net:27017/Apipar4i');

var User=require('./app/models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.use(express.static(__dirname + '/public'));

router.use(function(req,res,next){
	console.log('Something is happening.');
	next();// make sure we go to the next routes and don't stop here
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


		});

	});

router.route('/login')
	//find a user (accessed at GET http://localhost:3000/koc/login)
	User.find(function(req,res){



	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /signup
app.use('/koc', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);







