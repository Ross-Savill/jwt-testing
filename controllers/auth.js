const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const generateToken = (user) => {
  const token = jwt.sign(
    { username: user.username },
    'coder-academy', // jwt secret
    { expiresIn: '1h' }
  );
  return token;
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username) {
    User.findOne({ username })
      .then(doc => {
        if (!doc) {
          return res.status(403).send('Bad credentials');
        }
        if (doc.password !== password) {
          return res.status(403).send('Bad credentials');
        }
        const token = generateToken(doc);
        return res.send({ token });
      });
  } else {
    return res.status(403).send('Bad credentials');
  }
});


module.exports = router;