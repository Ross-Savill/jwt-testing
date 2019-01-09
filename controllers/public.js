const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.send('router is connected');
});

router.get('/test', (req, res) => {
  return res.send('public test');
});

module.exports = router;