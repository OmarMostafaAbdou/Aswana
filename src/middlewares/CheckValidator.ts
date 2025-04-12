import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import CustomError from "../helpers/Errors";  
const validate = (validatorsArray: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validatorsArray.map(validator => validator.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new CustomError("Validator error", 422, errors.mapped());
      return next(err);
    }

    next();
  };
};  

export default validate;