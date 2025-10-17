import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    authorId: { type: String },
    category: { type: String, default: 'General' },
    tags: { type: [String], default: [] },
    excerpt: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);

