'use strict';

var express = require('express'),
    router = express.Router(),
    authService = require('../auth/authService'),
    tokenController = require('../controllers/tokenController')


router.post('/', tokenController.createToken);

router.use('/:tokenId', authService.authenticate, authService.authorize);

router.get('/:tokenId', tokenController.getToken);
router.delete('/:tokenId', tokenController.deleteToken);

module.exports = router;
