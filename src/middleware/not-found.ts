import {NextFunction, Request, Response} from 'express';

import {API_NOT_FOUND, errorInfo} from '../helper/error';

export const configureNotFound =
    (_req: Request, res: Response, _next: NextFunction): void => {
      const {httpStatus, errorBody} = errorInfo[API_NOT_FOUND];
      res.status(httpStatus).json(errorBody);
    };