const express = require('express');
var fs = require('fs');
var https = require('https');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://localhost/homerun');
const port = process.env.PORT || 3000;

const UserModel = require('./users/userModel');
const TokenModel = require('./auth/tokenModel');
const DayModel = require('./days/dayModel');

const AuthService = require('./auth/authService')(TokenModel, UserModel);

const UserController = require('./users/userController')(UserModel);
const DayController = require('./days/dayController')(DayModel);
const TokenController = require('./auth/tokenController')(TokenModel, AuthService);

const authenticator = require("./middleware/authenticationMiddleware")(UserModel, TokenModel);
const authorizer = require("./middleware/authorizationMiddleware")(UserModel);

const userRouter = require('./common/commonRouter')(UserModel, UserController, "users");
const dayRouter = require('./common/commonRouter')(DayModel, DayController, "days");
const authRouter = require('./common/commonRouter')(TokenModel, TokenController, "tokens");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(authenticator);
app.use(authorizer);

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', dayRouter);

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
