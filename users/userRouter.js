/* eslint-disable no-param-reassign */
const express = require('express');
const userController = require("./userController");

function routes(UserModel) {
  const userRouter = express.Router();
  const controller = userController(UserModel);

  userRouter.route('/users')
  .post(controller.post)
  .get(controller.get);

  userRouter.use('/users/:userId', async (req, res, next) => {
    try {
      let user = await UserModel.findById(req.params.userId);
      req.requestedResource = user;
    } catch(err) {
      next(err);
    }
    next();
  });
  
  userRouter.route('/users/:userId')
    .get(controller.getUser)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteUser);

  return userRouter;
}

  module.exports = routes;