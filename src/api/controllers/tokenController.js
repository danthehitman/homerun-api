'use strict';

var mongoose = require('mongoose'),
    userModel = mongoose.model('user'),
    tokenModel = mongoose.model('token'),
    uuidv1 = require('uuid/v1'),    
    bcrypt = require('bcrypt');

exports.createToken = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user;

    userModel.findOne().byEmail(email).exec()
    .then((foundUser) => {   
        user = foundUser;     
        return bcrypt.compare(password, user.password);
    })
    .then(function(match) {
        if (!match)
            res.status(401).json({ message: 'Unauthorized' }).send();
        else {
            var newToken = new tokenModel();
            newToken.userId = user._id;
            newToken.token = uuidv1();
            
            return newToken.save();
        }
    })
    .then(function (token) {
        res.json(token);
    })
    .catch((error) => {
        res.send(error);
    });
};

exports.getToken = (req, res) => {
    tokenModel.findById(req.params.tokenId, function (err, token) {
        if (err)
            res.send(err);
        res.json(token);
    });
};

exports.deleteToken = (req, res) => {
    tokenModel.deleteOne({
        _id: req.params.tokenId
    }, function (err, token) {
        if (err)
            res.send(err);
        res.json({ message: 'token successfully deleted' });
    });
};