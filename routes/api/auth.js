const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const tokenMiddleware = require('../../middleware/tokenMiddlware');

const router = express.Router();

// @route GET api/auth

// authentification users

router.get('/', tokenMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});
// authorization user & get token

router.post('/', [
  check('password', 'Password is required').exists(),
  check('email', 'Please enter a valid email').isEmail(),
], async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const isMatchPswrd = await bcrypt.compare(password, user.password);

    if (!isMatchPswrd) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('JWTSecretKey'), (err, token) => {
      if (err) { throw err; }
      res.json({ token });
    }, { expiresIn: '80d' });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
