const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    issueId: {
      type: Schema.Types.ObjectId,
      ref: 'Issue'
    },
    username: {
      type: String,
      required: true
    },
    datePosted: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)