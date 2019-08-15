'use strict';

var mongoose = require('mongoose'),
  user = mongoose.model('user'),
  bcrypt = require('bcrypt');

exports.list_all_users = (req, res) => {
  user.find({}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_a_user = (req, res) => {  
  var new_user = new user(req.body);
  bcrypt.hash(new_user.password, 10, (err, hash) => {
    new_user.password = hash;
    new_user.save(function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
};

exports.read_a_user = (req, res) => {
  user.findById(req.params.userId, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = (req, res) => {
  user.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = (req, res) => {
  user.deleteOne({
    _id: req.params.userId
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'user successfully deleted' });
  });
};


