import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  isActivated: {type: Boolean, default: false},
  role: { type: String, default: 'USER' },
});
