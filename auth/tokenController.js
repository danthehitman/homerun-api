const uuidv1 = require("uuid/v1");

function tokenController(TokenModel, UserModel, AuthService) {
  
  get = async (req, res, next) => {
    const {query} = req;
    try {
      return res.send(await TokenModel.find(query));
    } catch(err) {
      next(err);
    }
    next();
  }

  function getToken(req, res) {
    return res.send(req.token);
  }

  post = async (req, res) => {
    try {
      const user = await AuthService.authenticateUser(req.body.username, req.body.password);
      if (user == null)
        res.sendStatus(401);
      let token = new TokenModel();
      token.userId = user._id;
      token.createdDate = new Date();
      let date = new Date();
      date.setDate(date.getDate() + 1);
      token.expireDate = date;
      token.token = uuidv1();
      await token.save();
      return res.status(201).json(token);
    } catch(err) {
      next(err);
    }
  }

  deleteToken = async (req, res, next) => {
    try {
      await req.token.remove();
      return res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }

  return { get, getToken,post, deleteToken };
}

module.exports = tokenController;