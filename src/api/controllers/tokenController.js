'use strict';

var mongoose = require('mongoose'),
    userModel = mongoose.model('user'),
    tokenModel = mongoose.model('token'),
    uuidv1 = require('uuid/v1'),    
    bcrypt = require('bcrypt');

exports.createToken = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var user = await getUserByEmail(email);
    if (user == null)
        return res.send(404);
    if (! await doesPasswordMatchHash(password, user.password))
        return res.status(401).json({ message: 'Unauthorized' }).send();
    var token = await createNewToken(user);
    res.json(token);
};

async function createNewToken (user) {
    var newToken = new tokenModel();
    newToken.userId = user._id;
    newToken.token = uuidv1();
    return await new Promise((resolve, reject) =>  {
        newToken.save((err, token) => {
        if (err)
            reject(err);
        resolve(token);
    })});
};

async function doesPasswordMatchHash (string, hash) {
    return await new Promise((resolve, reject) => {
        bcrypt.compare(string, hash, (err, match) => {
        if (!match || err)
            resolve(false);
        resolve(true);        
    })});
};

async function getUserByEmail (email) {
    return await new Promise((resolve, reject) => {
        userModel.findOne().byEmail(email).exec((err, user) => {   
        if (err)
            reject(err);
        resolve(user);
    })});
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