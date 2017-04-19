var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var path = require('path');

var mongoose = require('mongoose');
var user = {};
var newUser, userFound;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/my_db');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
app.use(session({secret: "Shh, its a secret!", saveUninitialized: false, resave: false}));
app.use(express.static(path.join(__dirname, 'public')));


var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    projects: [{
    	projectName: String, 
    	userTasks: [],

    }]
    
});
var User = mongoose.model("User", userSchema);


app.get('/', function(req,res){
	res.render('home');
})

app.get('/sample.html', function(req, res){

	console.log('Samle request');
})

function checkLogin(req, res, next){
	if(req.session.user){
		console.log('loginCheckS '
			+ req.session.user);
		next();
	}
	else{
		var err = new Error("Not logged in!");
    	console.log('loginCheckF ' + err);
        res.render('login', {Message: "Pease login with your crediantials"});
	}

}

app.get('/registration', function(req, res){
	res.render('registration');
})

app.post('/user/store', function(req, res){
	var userInfo = req.body;
	var x = false;
	 
	if(req.body.name=='' || req.body.email=='' || req.body.password=='' || req.body.phoneNumber==''){
		res.render('registration', {Message: 'Please check your details'});
	}
	else{
		User.find(function(err, response){
			allUsers = response;
				for (var i = 0; i < allUsers.length; i++) {
						if (allUsers[i].email == userInfo.email) {
							x = true;
							break;

						}
				}
				if (x) {
					res.render('registration', {Message: 'There is already an account with this Email'});
				}
				else{
					 newUser = new User({
		            name: userInfo.name,
		            email: userInfo.email,
		            password: userInfo.password,
		            phoneNumber: userInfo.phoneNumber,
		            projects: [/*{projectName:'', userTasks: [] }*/]
		            /*userTasks: [{task:'', priority:'', date: ''}],*/
		        });
	        	newUser.save(function(err){
	            if(err)
	                res.render('registration', {Message: "Database error", type: "error"});
	            else{
	            	req.session.user = newUser;
	            	user = newUser;
	            	userFound = newUser;
	            	console.log('user details are ' + userFound);
	            	res.redirect('/sample.html');
	            }
	        });
			}
		});
	}
})

app.get('/login', function(req, res){
	res.render('login');
})

app.post('/mainBlog', function(req, res){
	 loginInfo = req.body;
	var y = false;
	User.find(function(err, response){
		allUsers = response;
		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i].email == loginInfo.email && allUsers[i].password == loginInfo.password) {
				userFound = allUsers[i];
				console.log('login User details are ' + userFound)
				y = true;
				break;
			}
		}
		if (y) {
			req.session.user = loginInfo;
			res.redirect('/sample.html');
		}
		else{
			for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i].email == loginInfo.email ) {
				res.render('login', {Message: "Incorrect details, Please check Mail ID and password"});
			}
		}
			res.render('registration', {Message: "Your details are not present"});
		}
	
	})
})

app.get('/user/tasks', function(req, res){
	//console.log("user details are " + userFound + 'and their tasks are ' + userFound.projects[0].userTasks  )
	res.send(userFound );
})

app.post('/addTask',  function(req, res){
	for (var i = 0; i < userFound.projects.length; i++) {
		if(userFound.projects[i].projectName == req.body.currentProject){
			var k = i;
			console.log('i is '+ i + ' ' + userFound.projects[k].projectName);
			var x = req.body.taskDetails;
			console.log('date is' + x.date);
				userFound.projects[k].userTasks.push(x);
				userFound.save(function(err){
		            if(err){
		                //res.render('registration', {Message: "Database error", type: "error"});
		            }
		            else{
		            	console.log( 'added task is ' + x + ' i value is '+ i);
						res.send(userFound );
		            }
		        });
		}
	}
	
})

app.post('/addProject', function(req, res){
	var newProject = req.body.newProject;
	var y = {
    	projectName: newProject, 
    	'userTasks': [],
	};
	userFound.projects.push(y);
	userFound.save(function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('new Project is:' + y.projectName);
			res.send(userFound);

		}
	})
})

app.post('/delRow', function(req, res){
	var delProject = req.body.delProject;
	var delTask = req.body.delTask;
	for (var i = 0; i < userFound.projects.length; i++) {
		if(userFound.projects[i].projectName == delProject){
			
		}
	}

})

app.get('/logout', function(req, res){
	req.session.destroy();
	res.render('login');
})



app.listen(3100);