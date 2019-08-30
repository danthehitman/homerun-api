authorizationMiddleware = (User) => {
  return authorize = async (req, res, next) => {
    req.header("auth");
    //get the user from the request.
    //authorize the user.
    next();
  };
};

module.exports = authorizationMiddleware;