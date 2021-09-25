import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: { type: String, required: true },
});
