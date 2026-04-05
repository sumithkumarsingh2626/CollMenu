import { ApiError } from '../utils/apiError.js';

export function errorHandler(error, request, response, next) {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Invalid input data.';
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'Duplicate entry.';
  }

  response.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv === 'development' && { stack: error.stack })
  });
}
