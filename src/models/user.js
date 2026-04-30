import { Schema, model } from 'mongoose';
import Joi from 'joi';

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 60,
    },
    surname: {
      type: String,
      minLength: 3,
      maxLength: 60,
    },
    salary: {
      type: Number,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model('user', userSchema);

const userAdd = Joi.object({
  password: Joi.string().min(8).max(32).required(),
  email: Joi.string().email().lowercase().trim().required(),
});

const userLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().lowercase().trim().required(),
});

const userUpdate = Joi.object({
  name: Joi.string().min(3).max(60),
  surname: Joi.string().min(3).max(60),
  salary: Joi.number().min(0).strict(),
}).min(1);

export { User, userAdd, userLogin, userUpdate };
