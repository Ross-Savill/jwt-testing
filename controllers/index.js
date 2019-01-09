const express = require('express');
const router = express.Router();

// router.use('/', require('./public'));
// GET /test

router.use('/protected', require('./protected'));
//  GET /protected/test

router.use('/auth', require('./auth'));

module.exports = router;