'use strict';

const asyncMiddleware = require('../middleware/asyncMiddleware');

var express = require('express'),
    router = express.Router(),
    authService = require('../auth/authService'),
    tokenController = require('../controllers/tokenController')


router.post('/', asyncMiddleware(async (req, res, next) =>  {
    await tokenController.createToken(req, res);
}));

router.use('/:tokenId', authService.authenticate, authService.authorize);

router.get('/:tokenId', tokenController.getToken);
router.delete('/:tokenId', tokenController.deleteToken);

module.exports = router;
