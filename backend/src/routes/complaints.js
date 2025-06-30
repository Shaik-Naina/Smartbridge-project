import express from 'express'
import { body, validationResult } from 'express-validator'
import Complaint from '../models/Complaint.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/complaints
// @desc    Get all complaints for the logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')

    res.json({
      success: true,
      count: complaints.length,
      data: complaints
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   GET /api/complaints/:id
// @desc    Get single complaint
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user', 'name email')

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      })
    }

    // Make sure user owns complaint
    if (complaint.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this complaint'
      })
    }

    res.json({
      success: true,
      data: complaint
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   POST /api/complaints
// @desc    Create new complaint
// @access  Private
router.post('/', [
  protect,
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').isIn(['Technical Issue', 'Billing', 'Service Quality', 'Product Defect', 'Delivery', 'Customer Service', 'Other']).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    const { title, description, category, priority } = req.body

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority: priority || 'medium',
      user: req.user.id
    })

    const populatedComplaint = await Complaint.findById(complaint._id).populate('user', 'name email')

    res.status(201).json({
      success: true,
      data: populatedComplaint
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   PUT /api/complaints/:id
// @desc    Update complaint
// @access  Private
router.put('/:id', [
  protect,
  body('title').optional().trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('category').optional().isIn(['Technical Issue', 'Billing', 'Service Quality', 'Product Defect', 'Delivery', 'Customer Service', 'Other']).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      })
    }

    let complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      })
    }

    // Make sure user owns complaint
    if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this complaint'
      })
    }

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email')

    res.json({
      success: true,
      data: complaint
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

// @route   DELETE /api/complaints/:id
// @desc    Delete complaint
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      })
    }

    // Make sure user owns complaint
    if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this complaint'
      })
    }

    await complaint.deleteOne()

    res.json({
      success: true,
      message: 'Complaint deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

export default router