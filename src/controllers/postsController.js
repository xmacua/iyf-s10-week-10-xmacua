const store = require('../data/store');
const { ApiError } = require('../middleware/errorHandler');

// GET all posts
const getAllPosts = (req, res) => {
    const { author, sort, search, page = 1, limit = 10 } = req.query;
    
    let result = [...store.posts];
    
    // Filter by author
    if (author) {
        result = result.filter(post => 
            post.author.toLowerCase().includes(author.toLowerCase())
        );
    }
    
    // Search in title and content
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(post => 
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower)
        );
    }
    
    // Sort
    if (sort === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'popular') {
        result.sort((a, b) => b.likes - a.likes);
    }
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIdx = (pageNum - 1) * limitNum;
    const endIdx = startIdx + limitNum;
    const paginatedResult = result.slice(startIdx, endIdx);
    
    res.json({
        data: paginatedResult,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total: result.length,
            pages: Math.ceil(result.length / limitNum)
        }
    });
};

// GET single post
const getPostById = (req, res) => {
    const id = parseInt(req.params.id);
    const post = store.posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ 
            error: 'Post not found' 
        });
    }
    
    res.json(post);
};

// POST create new post
const createPost = (req, res) => {
    const { title, content, author } = req.body;
    
    const newPost = {
        id: store.nextId.increment(),
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: null,
        likes: 0
    };
    
    store.posts.push(newPost);
    res.status(201).json(newPost);
};

// PUT update post
const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ 
            error: 'Post not found' 
        });
    }
    
    const { title, content } = req.body;
    
    store.posts[postIndex] = {
        ...store.posts[postIndex],
        title: title ? title.trim() : store.posts[postIndex].title,
        content: content ? content.trim() : store.posts[postIndex].content,
        updatedAt: new Date().toISOString()
    };
    
    res.json(store.posts[postIndex]);
};

// DELETE post
const deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const postIndex = store.posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
        return res.status(404).json({ 
            error: 'Post not found' 
        });
    }
    
    store.posts.splice(postIndex, 1);
    res.status(204).send();
};

// PATCH like a post
const likePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = store.posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ 
            error: 'Post not found' 
        });
    }
    
    post.likes++;
    res.json(post);
};

// PATCH unlike a post
const unlikePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = store.posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ 
            error: 'Post not found' 
        });
    }
    
    if (post.likes > 0) {
        post.likes--;
    }
    
    res.json(post);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost
};
