// models/Skill.ts
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  numb: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true,
  },
  quiz: [questionSchema], // Embed an array of questionSchema
});


skillSchema.plugin(passportLocalMongoose);

export default mongoose.model('Skill', skillSchema);
