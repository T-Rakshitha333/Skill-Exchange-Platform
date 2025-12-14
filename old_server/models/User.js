// models/User.ts
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type : String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  requests: [String],
  skills: [String], // Array of user skills
  interests: [String], // 
  // Add other user fields as needed
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', userSchema);
