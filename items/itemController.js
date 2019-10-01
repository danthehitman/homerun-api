function itemsController(ItemModel) {

  get = async (req, res, next) => {
    const {query} = req;
    try {
      return res.json(await(ItemModel.find(query)));
    } catch(err) {
     return next(err);
    }
  }

  getResource = async (req, res, next) => {
    return res.send(req.requestedResource);
  }

  post = async (req, res, next) => {
    try {
      let resource = new ItemModel(req.body);
      resource = await resource.save();
      return res.status(201).json(resource);
    } catch(err) {
      return next(err);
    }
  }

  put = async (req, res, next) => {
    let resource = new ItemModel(req.body);
    try {
      resource = await resource.save();
      return res.status(200).json(resource);
    } catch(err) {
      return next(err);
    }
  }

  patch = async (req, res, next) => {
    try {
      let resource = await ItemModel.findOneAndUpdate({ _id: req.params.resourceId }, req.body, { new: true });
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

module.exports = itemsController;