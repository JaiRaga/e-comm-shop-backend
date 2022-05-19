const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST Route ==> Create a user
router.post('/', async (req, res) => {
  try {
    const user = new User({ ...req.body });
    if (!user) {
      return res.status(400).json({ message: 'Cannot create the user' });
    }

    await user.save();
    res.status(201).json({ user, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

module.exports = router;
