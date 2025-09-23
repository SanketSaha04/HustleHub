import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for Google OAuth users
    googleId: { type: String },
    jobTitle: { type: String },
    skills: { type: [String] },
    experience: { type: String },
    resumePath: { type: String }
});

const User = mongoose.model("User", userSchema);

export default User;