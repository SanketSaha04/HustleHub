import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  gigId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gig', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  submission: {
    filePath: String,
    notes: String,
    link: String, // Add this line for the submission link
    submittedAt: Date
  }
}, { timestamps: true });

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;