/* eslint-disable no-param-reassign */
const express = require('express');
const tokenController = require("./tokenController");

function routes(TokenModel, UserModel, AuthService) {
  const tokenRouter = express.Router();
  const controller = tokenController(TokenModel, UserModel, AuthService);

  const resourceRoot = '/tokens';

  tokenRouter.route(resourceRoot)
  .post(controller.post)
  .get(controller.get);

  tokenRouter.use(`${resourceRoot}/:tokenId`, async (req, res, next) => {
    try {
      let token = await TokenModel.findById(req.params.tokenId);
      req.token = token;
      if (token) {
        req.token = token;
      } else {
        return res.status(404).send({message: "Token not found."});
      }
    } catch(err) {
      next(err);
    }
    next();
  });
  
  tokenRouter.route(`${resourceRoot}/:tokenId`)
    .get(controller.getToken)
    .delete(controller.deleteToken);

  return tokenRouter;
}

  module.exports = routes;