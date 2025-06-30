import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Complaint title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Complaint description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Technical Issue',
      'Billing',
      'Service Quality',
      'Product Defect',
      'Delivery',
      'Customer Service',
      'Other'
    ]
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved', 'closed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  resolution: {
    type: String,
    maxlength: [500, 'Resolution cannot be more than 500 characters']
  },
  resolvedAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Index for better query performance
complaintSchema.index({ user: 1, status: 1 })
complaintSchema.index({ category: 1, priority: 1 })

export default mongoose.model('Complaint', complaintSchema)