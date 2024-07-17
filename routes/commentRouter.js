const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

commentRouter.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find()
    return res.status(200).send(comments)
  } catch (error) {
    res.status(500)
    return next(error)
  }
})

commentRouter.post('/:issueId', async(req, res, next) => {
    try {
        req.body.issueId = req.params.issueId
        req.body.userId = req.auth._id
        req.body.username = req.auth.username
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        return res.status(201).send(savedComment)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

commentRouter.delete('/:commentId', async (req, res, next) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
        return res.status(200).send(`Comment deleted: ${deletedComment}`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = commentRouter