const uuidv1 = require("uuid/v1");

function tokenController(TokenModel, AuthService) {
  
  get = async (req, res, next) => {
    const {query} = req;
    try {
      return res.send(await TokenModel.find(query));
    } catch(err) {
      next(err);
    }
    next();
  }

  function getResource(req, res) {
    return res.send(req.requestedResource);
  }

  post = async (req, res) => {
    try {
      const user = await AuthService.authenticateUser(req.body.username, req.body.password);
      if (user == null)
        res.sendStatus(401);
      let resource = new TokenModel();
      resource.userId = user._id;
      resource.createdDate = new Date();
      let date = new Date();
      date.setDate(date.getDate() + 1);
      resource.expireDate = date;
      resource.token = uuidv1();
      await resource.save();
      return res.status(201).json(resource);
    } catch(err) {
      next(err);
    }
  }

  put = async (req, res, next) => {
    res.status(405).send("PUT not supported on /tokens")
  }

  patch = async (req, res, next) => {
    res.status(405).send("PATCH not supported on /tokens")
  }

  deleteResource = async (req, res, next) => {
    try {
      await req.requestedResource.remove();
      return res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }

  return { get, getResource, put, post, patch, deleteResource };
}

module.exports = tokenController;