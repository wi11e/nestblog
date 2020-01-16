import * as mongoose from 'mongoose';

export const BlogPostSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  location: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  moon: {
    percentageOfMoon: Number,
    emojiOfMoon: String,
  },
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});
