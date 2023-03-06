var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cathrinehappiness:baraka6571@cluster0.5v8oirq.mongodb.net/gfg?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
	console.log("connection succeeded");
})

var app = express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var height = req.body.height;

	var data = {
		"name": name,
		"email": email,
		"height": height,
	
	}
	db.collection('details').insertOne(data, function (err, collection) {
		if (err) throw err;
		console.log("Record inserted Successfully");

	});

	return res.redirect('signup_success.html');
})

share = async (entry, email) => {
    const args = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
              <h1>Thank you for your information. Your height is + height.</h1>
         
              `
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Your height.}`
            }
        },
       
    }

    const request = new AwsRequest.Builder()
        .withService('ses')
        .withAction('SendEmail')
        .withRegion('us-east-1')
        .withArgs(args)
        .build()

    return this.aws.execute(request)
}

app.get('/', function (req, res) {
	res.set({
		'Access-control-Allow-Origin': '*'
	});
	return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
