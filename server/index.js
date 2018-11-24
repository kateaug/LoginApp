const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');

app.use(session({
	secret: 'hcsoncncmjcwechosdpof834r98f3gresdnoi',
	saveUninitialized: false,
	resave: false
}));

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/angulardb')
.then(() => console.log('mongoose up'));

const User = require('./models/user');

app.use(bodyParser.json());

app.post('/api/quote', async (req,res) => {
	console.log(req.session.user, req.body.value)
	const user = await User.findOne({email: req.session.user});

	if(!user) {
		res.json({
			success: false,
			message: 'Invalid user'
		})
		return
	} 

	await User.update({email: req.session.user}, {$set: {quote: req.body.value}});
	res.json({
		success: true
	})
});

app.post('/api/login', async (req, res) => {
	const {email, password} = req.body;
	const resp = await User.findOne({email, password});

	if(!resp) {
		// user login incorrect
		res.json({
			success: false,
			message: 'Incorrect details'
		});
	} else {
		// make a session and set user to logged in
		console.log('You are logged in');
		res.json({
			success: true
		});
		req.session.user = email;
		req.session.save();
	}
});

app.get('/api/isloggedin', (req, res) => {
	res.json({
		status: !!req.session.user
	});
});

app.post('/api/register', async (req, res) => {
	const { email, password } = req.body;

	const existingUser = await User.findOne({email});

	if(existingUser) {
		res.json({
			success: false,
			message: 'Email is already used'
		});
    return

	}

	const user = new User({
		email,
		password
	});

	const result = await user.save();
	console.log(result);
	res.json({
		success: true,
		message: 'Welcome'
	});

});

app.get('/api/data', async (req, res) => {

	const user = await User.findOne({email: req.session.user});
    
    if(!user) {
    	res.json({
    		status: false,
    		message: 'User was deleted'
    	});
    	return
    }

	res.json({
		status: true,
		email: req.session.user,
		quote: user.quote
	});


});

app.get('/api/logout', (req, res) => {
	req.session.destroy()
	res.json({
		success: true
	})
});



app.listen(1234, () => console.log('Server listening at 1234'));

