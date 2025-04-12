import { check } from 'express-validator';

export const signupValidation = [
  check('email').isEmail().withMessage('Email is not valid'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('username').notEmpty().withMessage('Username is required'),
  check('first_name').notEmpty().withMessage('First name is required'),
  check('last_name').notEmpty().withMessage('Last name is required'),
];

export const loginValidation = [
  check('email').isEmail().withMessage('Email is not valid'),
  check('password').notEmpty().withMessage('Password is required'),
];
