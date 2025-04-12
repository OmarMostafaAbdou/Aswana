import { Request, Response, NextFunction } from 'express';

module.exports=(params: string[])=>(req: Request, res: Response, next: NextFunction)=>{
    const receivedParams=Object.keys(req.body)
  const  missingParams=params.filter(paramName=>!receivedParams.includes(paramName))
  if(missingParams.length){
    return res.status(422).json({  
        message: "Required parameters missing",
        errors: missingParams.reduce<Record<string, { type: string }>>((agg, param) => {
            agg[param] = { type: "required" };
            return agg;
          }, {})
    });
  }
  next()
}

