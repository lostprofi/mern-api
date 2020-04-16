const express = require('express');
const User = require('../../models/User');

const router = express.Router();


// @route GET api/profile

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
