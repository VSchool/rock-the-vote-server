const express = require("express")
const Issue = require("../models/issue")
const issueRouter = express.Router()

//post
issueRouter.post('/', async (req, res, next) => {
    try {
        req.body.username = req.auth.username
        req.body.userId = req.auth._id
        const newIssue = new Issue(req.body)
        const savedIssue = await newIssue.save()
        return res.status(201).send(savedIssue)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get
issueRouter.get('/user', async (req, res, next) => {
    try {
        const foundIssues = await Issue.find({ userId: req.auth._id })
        return res.status(200).send(foundIssues)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

issueRouter.get('/allIssues', async (req, res, next) => {
    try {
        const foundIssues = await Issue.find()
        return res.status(200).send(foundIssues)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

issueRouter.delete('/:issueId', async (req, res, next) => {
    try {
        const deletedIssues = await Issue.findByIdAndDelete(req.params.issueId)
        return res.status(200).send('Issue Deleted')
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

issueRouter.put('/edit/:issueId', async (req, res, next) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.issueId,
            req.body,
            { new: true }
        )
        return res.status(201).send(updatedIssue)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

issueRouter.put('/upvotes/:issueId', async (req, res, next) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.issueId,
            {
                $addToSet: { upvotes: req.auth._id },
                $pull: { downvotes: req.auth._id }
            },
            { new: true }
        )
        return res.status(201).send(updatedIssue)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

issueRouter.put('/downvotes/:issueId', async (req, res, next) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.issueId,
            {
                $addToSet: { downvotes: req.auth._id },
                $pull: { upvotes: req.auth._id }
            },
            { new: true }
        )
        return res.status(201).send(updatedIssue)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = issueRouter