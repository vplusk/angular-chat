var path = require('path'),
	express = require('express'),
	staticPath = path.normalize(__dirname),
	app = express(),
	server = app.listen(7777);
	bodyParser = require('body-parser');


app.use(express.static(staticPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = [{"name":"Vasya", "text":"hello"}, {"name":"Petya", "text":"hello"}];

app.get('/messages', function (req, res) {
	res.send(messages);
});

app.post('/messages', function (req, res) {
	var message = req.body;
	messages.push(message);
	res.json(message);
});

module.exports = app;