const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const router = express.Router();

router.post('/', [
  check('name', 'Please enter your name').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more chracters').isLength({ min: 6 }),
  check('email', 'Please enter a valid email').isEmail(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.send('Users registered');

  } catch (err) {
    return res.status(500).send('Server error');
   
  }

});

module.exports = router;
