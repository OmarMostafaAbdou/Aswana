import AuthController from '../controllers/Auth.controller';
import { Router } from 'express';
import validate from '../../../middlewares/CheckValidator';
import { loginValidation, signupValidation } from '../../../validators/Auth.validators';
import { container } from 'tsyringe';
const checkRequireParams = require("../../../middlewares/CheckRequired");

const router = Router();
const authController = container.resolve(AuthController);

router.post('/signup', 
  checkRequireParams(["username", "email", "password", "first_name", "last_name"]),
  validate(signupValidation),
  authController.userSignup
);

router.post('/login', 
  checkRequireParams(["email", "password"]),
  validate(loginValidation), 
  authController.userLogin
);

module.exports = router;