import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export const authenticateAdmin = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Access denied. Admin token required.');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    request.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(403, 'Invalid admin token.');
  }
};

