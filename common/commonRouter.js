/* eslint-disable no-param-reassign */
const express = require('express');

function commonRouter(ResourceModel, controller, resourceRoot) {
  const router = express.Router();

  router.route(`/${resourceRoot}`)
  .post(controller.post)
  .get(controller.get);

  router.use(`/${resourceRoot}/:resourceId`, async (req, res, next) => {
    try {
      let resource = await ResourceModel.findById(req.params.resourceId);
      if (!resource)
        return res.status(404).send({message: "Resource not found."});
      req.requestedResource = resource;
    } catch(err) {
      next(err);
    }
    next();
  });
  
  router.route(`/${resourceRoot}/:resourceId`)
    .get(controller.getResource)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteResource);

  return router;
}

module.exports = commonRouter;