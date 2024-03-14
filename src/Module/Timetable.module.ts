import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define Post (Timetable) model
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = model('Post', PostSchema);

const TimetableSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  describe: {
    type: String,
    required: false
  },
  time: [],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Timetable = model('Timetable', TimetableSchema);

export { Post, Timetable };

