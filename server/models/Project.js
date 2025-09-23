import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    liveUrl: { type: String },
    codeUrl: { type: String },
    imageUrl: { type: String },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;