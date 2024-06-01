const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Home route
router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (!err) {
      res.render('index', { posts: posts });
    } else {
      console.log(err);
    }
  });
});

// New post route
router.get('/new', (req, res) => {
  res.render('new-post');
});

router.post('/new', (req, res) => {
  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });
  newPost.save((err) => {
    if (!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
  });
});

// Individual post route
router.get('/posts/:postId', (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, (err, post) => {
    if (!err) {
      res.render('post', { title: post.title, content: post.content });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
