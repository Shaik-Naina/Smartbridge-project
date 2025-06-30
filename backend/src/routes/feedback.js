import express from 'express'
import { body, validationResult } from 'express-validator'
import Feedback from '../models/Feedback.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/feedback
// @desc    Get all feedback for the logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('complaint', 'title category')

    res.json({
      success: true,
      count: feedback.length,
      data: feedback
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Private
router.post('/', [
  protect,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot be more than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { rating, comment, complaint } = req.body

    const feedback = await Feedback.create({
      rating,
      comment,
      complaint,
      user: req.user.id
    })

    const populatedFeedback = await Feedback.findById(feedback._id)
      .populate('user', 'name email')
      .populate('complaint', 'title category')

    res.status(201).json({
      success: true,
      data: populatedFeedback
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   GET /api/feedback/stats
// @desc    Get feedback statistics
// @access  Private (Admin only in production)
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalFeedback: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ])

    if (stats.length === 0) {
      return res.json({
        success: true,
        data: {
          averageRating: 0,
          totalFeedback: 0,
          ratingDistribution: []
        }
      })
    }

    const ratingCounts = stats[0].ratingDistribution.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1
      return acc
    }, {})

    res.json({
      success: true,
      data: {
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        totalFeedback: stats[0].totalFeedback,
        ratingDistribution: ratingCounts
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

export default router