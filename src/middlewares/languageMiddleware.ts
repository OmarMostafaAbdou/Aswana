import { Request, Response, NextFunction } from "express";

const supportedLangs = ["en", "ar"];

const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const lang = req.params.lang;
    
    if (supportedLangs.includes(lang)) {
        res.locals.lang = lang;
    } else {
        res.locals.lang = "en";
    }

    next();
};

export default languageMiddleware;
