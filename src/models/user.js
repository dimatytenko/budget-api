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
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 60,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 60,
    },
    salary: {
      type: Number,
      default: null,
    },
    workHoursByWeek: {
      type: Number,
      default: null,
    },
    expectReturnPercentage: {
      type: Number,
      default: null,
    },
    investForYear: {
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
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Password and confirm password must match' }),
  email: Joi.string().email().lowercase().trim().required(),
});

const userLogin = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().lowercase().trim().required(),
});

const userUpdate = Joi.object({
  firstName: Joi.string().min(3).max(60),
  lastName: Joi.string().min(3).max(60),
  salary: Joi.number().min(0).strict(),
  workHoursByWeek: Joi.number().min(0).strict(),
  expectReturnPercentage: Joi.number().min(0).strict(),
  investForYear: Joi.number().min(0).strict(),
}).min(1);

export { User, userAdd, userLogin, userUpdate };
