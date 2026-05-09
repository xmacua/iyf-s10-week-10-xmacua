const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { validatePost } = require('../middleware/validate');

// GET all posts
router.get('/', postsController.getAllPosts);

// GET single post
router.get('/:id', postsController.getPostById);

// POST create new post
router.post('/', validatePost, postsController.createPost);

// PUT update post
router.put('/:id', validatePost, postsController.updatePost);

// DELETE post
router.delete('/:id', postsController.deletePost);

// PATCH like a post
router.patch('/:id/like', postsController.likePost);

// PATCH unlike a post
router.patch('/:id/unlike', postsController.unlikePost);

module.exports = router;
