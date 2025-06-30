import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  complaint: {
    type: mongoose.Schema.ObjectId,
    ref: 'Complaint'
  }
}, {
  timestamps: true
})

// Index for better query performance
feedbackSchema.index({ user: 1 })
feedbackSchema.index({ rating: 1 })

export default mongoose.model('Feedback', feedbackSchema)