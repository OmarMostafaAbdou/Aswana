class CustomError extends Error {
  statusCode: number;
  errors?: any;
  
  constructor(message: string, statusCode: number, errors?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message=message
    this.errors = errors;
    
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;