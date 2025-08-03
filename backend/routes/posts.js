const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.send(posts);
});

router.post('/like', async (req, res) => {
  const { postId, userId } = req.body;
  await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
  res.send('Liked');
});

module.exports = router;
