import { NextFunction, Request, Response } from 'express';

export const loggerIntercaptor = async (request: Request, response: Response, next: NextFunction) => {
  try {
    return next();
  } catch (error) {
    return;
  }
};
