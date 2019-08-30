authenticationMiddleware = (User, Token) => {
  return authenticate = async (req, res, next) => {
    //Skip auth when trying to create a token (log-in);
    if (("/api/tokens" === req.path || "/api/tokens/" === req.path) && req.method === "POST") {
      return next();
    } else {
      try {
        let authToken = req.header("auth");
        let token = await Token.findOne({token: authToken});
        let authenticated = false;
        if (token != null) {
          let user = await User.findOne({_id: token.userId});
          if (user != null) {
            authenticated = true;
            req.user = user;
            let expireDate = new Date(token.expireDate);
            expireDate.setDate(expireDate.getHours() + 1)
            token.expires = expireDate.getDate();
          }
        }
        if (!authenticated)
          return res.sendStatus(401);
        next();
      }
      catch(err) {
        next(err);
      }
    }
  };
}

module.exports = authenticationMiddleware;