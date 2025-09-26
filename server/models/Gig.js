import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },
  budget: { type: String, required: true },
  duration: { type: String, required: true },
  attachment: { type: String }, // Path to the file
  featured: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false } // Add this line
}, { timestamps: true });

const Gig = mongoose.model('Gig', gigSchema);

export default Gig;