export const INTERNAL_ERROR = 'INTERNAL_ERROR';
export const API_NOT_FOUND = 'API_NOT_FOUND';
export const NOT_FOUND = 'NOT_FOUND';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const errorInfo: {[key: string]: Error} = {

  [INTERNAL_ERROR]: {
    httpStatus: 500,
    errorBody: {errorCode: 1001, errorMessage: 'Internal server error'}
  },
  [API_NOT_FOUND]: {
    httpStatus: 404,
    errorBody: {errorCode: 1002, errorMessage: 'API does not exist'}
  },
  [NOT_FOUND]: {
    httpStatus: 404,
    errorBody: {errorCode: 1003, errorMessage: 'Content not found'}
  },
  [INVALID_TOKEN]: {
    httpStatus: 401,
    errorBody: {errorCode: 1004, errorMessage: 'Invalid token'}
  }
};

export interface Error {
  httpStatus: number;
  errorBody: {errorCode: number, errorMessage: string};
}

export class CustomError extends Error {
  constructor(private error: Error) {
    super(error.errorBody.errorMessage);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  getError(): Error {
    return this.error;
  }
}