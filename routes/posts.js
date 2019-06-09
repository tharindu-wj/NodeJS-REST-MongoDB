const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//Getting All
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Getting One
router.get('/:id', getPost, (req, res) => {
    res.json(res.post)
})

//Creating One
router.post('/', async (req, res) => {
    const data = req.body;

    /*let post = new Post()
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            post.property = data[property]
        }
    }*/
     const post = new Post({

         title: data.title,
         body: data.body,
         author: data.author,
         category: data.category,
     })

    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Updating One
router.patch('/:id', getPost, async (req, res) => {
    const data = req.body;

    if (data.title != null) {
        res.post.title = data.title
    }
    if (data.body != null) {
        res.post.body = data.body
    }

    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Deleting One
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({message: 'Post Deleted'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//get post by id
async function getPost(req, res, next) {
    let post
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({message: 'Cannot find post'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.post = post
    next()
}

module.exports = router