const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
  prize: {
    type: String,
    required: true,
  },
  focus: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming',
  }
}, { timestamps: true });

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

module.exports = Hackathon;