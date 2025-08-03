const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.post('/', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.send(comment);
});

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate('author');
  res.send(comments);
});

module.exports = router;
