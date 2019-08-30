function usersController(UserModel) {

  get = async (req, res, next) => {
    const {query} = req;
    try {
      return res.json(await(UserModel.find(query)));
    } catch(err) {
     return next(err);
    }
  }

  getUser = async (req, res) => {
    return res.send(req.requestedResource);
  }

  post = async (req, res) => {
    try {
      const user = new UserModel(req.body);
      user = await user.save();
      return res.status(201).json(user);
    } catch(err) {
      return next(err);
    }
  }

  put = async (req, res, next) => {
    let user = req.requestedResource;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.birthDate = req.body.birthDate;
    user.type = req.body.type;
    try {
      user = await user.save();
      return res.status(200).json(user);
    } catch(err) {
      return next(err);
    }
  }

  patch = async (req, res, next) => {
    try {
      let user = await UserModel.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
      res.status(201).json(user);
    } catch(err) {
      next(err);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      await req.requestedResource.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }

  return { get, getUser, put, post, patch, deleteUser };
}

module.exports = usersController;