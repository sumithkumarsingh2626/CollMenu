import { ApiError } from '../utils/apiError.js';

export function notFound(request, response) {
  throw new ApiError(404, `Route ${request.originalUrl} not found`);
}
