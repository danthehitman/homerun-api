const express = require('express');
var fs = require('fs');
var https = require('https');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/homerun');
const port = process.env.PORT || 3000;

const User = require('./users/userModel');
const userRouter = require('./users/userRouter')(User);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome');
});

https.createServer({
  key: fs.readFileSync('./devcerts/server.key'),
  cert: fs.readFileSync('./devcerts/server.cert')
}, app)
.listen(port, () => {
  console.log(`Running on port ${port}`);
});
