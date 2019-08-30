function usersController(UserModel) {

  get = async (req, res, next) => {
    const {query} = req;
    try {
      return res.json(await(UserModel.find(query)));
    } catch(err) {
     return next(err);
    }
  }

  getResource = async (req, res) => {
    return res.send(req.requestedResource);
  }

  post = async (req, res) => {
    try {
      const resource = new UserModel(req.body);
      resource = await resource.save();
      return res.status(201).json(resource);
    } catch(err) {
      return next(err);
    }
  }

  put = async (req, res, next) => {
    let resource = req.requestedResource;
    resource.firstName = req.body.firstName;
    resource.lastName = req.body.lastName;
    resource.username = req.body.username;
    resource.birthDate = req.body.birthDate;
    resource.type = req.body.type;
    try {
      resource = await resource.save();
      return res.status(200).json(resource);
    } catch(err) {
      return next(err);
    }
  }

  patch = async (req, res, next) => {
    try {
      let resource = await UserModel.findOneAndUpdate({ _id: req.params.resourceId }, req.body, { new: true });
      res.status(201).json(resource);
    } catch(err) {
      next(err);
    }
  }

  deleteResource = async (req, res, next) => {
    try {
      await req.requestedResource.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }

  return { get, getResource, put, post, patch, deleteResource };
}

module.exports = usersController;