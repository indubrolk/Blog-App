import { Router } from 'express';
import Post from '../models/Post.js';

const router = Router();

// List posts with optional query filters
router.get('/', async (req, res) => {
  try {
    const { category, tag, author } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (author) filter.author = author;
    if (tag) filter.tags = tag;
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: 'Invalid post id' });
  }
});

// Create post
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.title || !body.content || !body.author) {
      return res.status(400).json({ message: 'title, content, author required' });
    }
    const post = await Post.create(body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Post not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete post' });
  }
});

export default router;

