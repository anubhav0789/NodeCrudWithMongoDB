var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./models/index.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Crud',{ useUnifiedTopology: true, useUnifiedTopology: true });
// setup connection with DB
var connection = mongoose.connection;
connection.once('open', function(){
	console.log("Connection Succesfully...");
})

app.set('view engine', 'ejs');//set template
//render insert page
app.get('/', function(req,res){
	//res.send("<h1>Hello Anubhav !</h1>");
	res.render('insert');
})
//insert document starts
app.post('/insert', function(req,res){
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})

	user.save(()=>{
		res.send('<h1>Data Inserted.<h1>');
	})
})
//insert document ends
//show document starts
app.get('/show', function(req,res){
	User.find({}, function(err,result){
		res.render('show', {users:result});
	});
})
//show document ends
//delete document starts
app.get('/delete/:id', async function(req,res){
	await User.findByIdAndDelete(req.params.id);
	res.redirect('/show');
})
//delete document ends
//update document starts
app.get('/edit/:id', async function(req,res){
	await User.findById(req.params.id, function(err,result){
		res.render('edit', {users:result});
	});
});

app.post('/update/:id', async function(req,res){
	await User.findByIdAndUpdate(req.params.id, req.body);
	res.redirect('/show');
})
//update document ends

var server = app.listen(4000, function(){
	console.log("Go to port number 4000");
})

