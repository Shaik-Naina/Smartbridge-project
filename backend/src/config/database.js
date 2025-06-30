import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://NayanaShaik:Nayana123@cluster0.aqdxtpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB