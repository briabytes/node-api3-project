const express = require('express');

const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', mw.logger, (req, res) => {
  Users.get()
    .then(users => {
      console.log(`here are the users: ${users}`);
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'users could not be retrieved'
      });
    })
});

router.get('/:id', mw.logger, mw.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', mw.logger, mw.validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'post could not be added'
      });
    })
});

router.put('/:id', mw.logger, mw.validateUserId, mw.validateUser, (req, res) => {
  const { id } = req.params
  const updatedUser = req.body
  Users.update(id, updatedUser)
    .then(user => {
      if(user) {
        res.status(201).json(user);
      }else {
        res.status(404).json({
          message: 'user does not exist'
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'could not update user'
      });
    })
});

router.delete('/:id', mw.logger, mw.validateUserId, (req, res) => {
  const { id } = req.params
  Users.remove(id)
    .then(() => {
      res.status(200).json({
        message: `these records were deleted: ${id}`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'could not delete user'
      });
    })
});

router.get('/:id/posts', mw.logger, mw.validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(posts => {
      res.status(201).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'could not retrieve user posts'
      });
    })
});

router.post('/:id/posts', mw.logger, mw.validateUserId, mw.validatePost, (req, res) => {
  const postInfo = {
    ...req.body,
    user_id: req.params.id
  };
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'could not add post to user'
      });
    })
});

module.exports = router;
