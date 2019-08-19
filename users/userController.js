function usersController(User) {
  function get (req, res) {
    const {query} = req;
    User.find(query, (err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  }

  function getUsers(req, res) {
    return res.send(req.user);
  }

  function post(req, res) {
    const user = new User(req.body);
    user.save((err) => {
      if (err) { 
        return res.send(err);
      }
      return res.status(201).json(user);
    });
  }

  function put(req, res) {
    user = req.user;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.birthDate = req.body.birthDate;
    user.type = req.body.type;
    user.save((err) => {
      if (err) { 
        return res.send(err);
      }
      return res.json(user);
    });
  }

  function patch (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    });
  }

  function deleteUser (req, res) {
    req.user.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    })
  }

  return { get, getUsers, put, post, patch, deleteUser };
}

module.exports = usersController;