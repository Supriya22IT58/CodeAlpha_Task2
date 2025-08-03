const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username, password: req.body.password });
  if (user) res.send(user);
  else res.status(400).send('Invalid credentials');
});

router.post('/follow', async (req, res) => {
  const { followerId, followeeId } = req.body;
  await User.findByIdAndUpdate(followerId, { $addToSet: { following: followeeId } });
  await User.findByIdAndUpdate(followeeId, { $addToSet: { followers: followerId } });
  res.send('Followed');
});

module.exports = router;
