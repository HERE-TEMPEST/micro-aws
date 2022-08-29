import { Request, Response } from 'express';
import { BaseException } from '../../exceptions/src';

export const resultIntercaptor = (callback) => async (request: Request, response: Response) => {
  try {
    const data = await callback(request);

    response.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    if (error instanceof BaseException) {
      response.status(400).json({
        status: 'error',
        data: {},
        error: { ...error, message: error.message },
      });
    } else {
      response.status(500).json({
        status: 'error',
        data: {},
        error: { category: 'INTERNAL_ERROR', subcategory: 'INTERNAL_ERROR', message: 'internal error' },
      });
    }
  }
};
