var express = require('express'),
  https = require('https'),
  fs = require('fs'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  
  user = require('./api/models/userModel'),
  token = require('./api/models/tokenModel'),

  bodyParser = require('body-parser'),
  tokenRouter = require('./api/routes/tokenRouter')
  
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/homerun'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//TODO: Create a "pipeline" of middleware adn pass it to the routers for create?
app.use('/tokens', tokenRouter);

var userRouter = require('./api/routes/userRoutes');
userRouter(app);

https.createServer({
  key: fs.readFileSync('../devcerts/server.key'),
  cert: fs.readFileSync('../devcerts/server.cert')
}, app)
.listen(port, function () {
  console.log('Homerun server started on: ' + port + ' Go to https://localhost:' + port + '/')
})

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke! : ' + err)
})


console.log('Homerun server started successfully.');