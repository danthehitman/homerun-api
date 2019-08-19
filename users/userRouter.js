/* eslint-disable no-param-reassign */
const express = require('express');
const userController = require("./userController");

function routes(User) {
  const userRouter = express.Router();
  const controller = userController(User);

  userRouter.route('/users')
  .post(controller.post)
  .get(controller.get);

  userRouter.use('/users/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
      } else {
        return res.status(404).send({message: "User not found."});
      }
      next();
    });
  });
  
  userRouter.route('/users/:userId')
    .get(controller.getUsers)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteUser);

  return userRouter;
}

  module.exports = routes;