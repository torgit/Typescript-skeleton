import {NextFunction, Request, Response} from 'express';

import {CustomError, errorInfo, INTERNAL_ERROR} from '../helper/error';

export const configureError =
    (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
      if (error instanceof CustomError) {
        const {httpStatus, errorBody} = (error as CustomError).getError();
        res.status(httpStatus).json(errorBody);
      } else {
        console.log('*********** UNHANDLED ERROR **********');
        console.log(error);
        console.log('**************************************');
        const {httpStatus, errorBody} = errorInfo[INTERNAL_ERROR];
        res.status(httpStatus).json(errorBody);
      }
    };