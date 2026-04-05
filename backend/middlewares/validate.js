import { ApiError } from '../utils/apiError.js';

// Named validators for routes
export const validateCartPayload = (request, response, next) => {
  const { itemId, quantity } = request.body;
  if (!itemId || !quantity || quantity < 1) {
    throw new ApiError(400, 'Valid itemId and quantity >=1 required');
  }
  request.validatedBody = { itemId, quantity };
  next();
};

export const validateCartQuantityUpdate = (request, response, next) => {
  const { quantity } = request.body;
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new ApiError(400, 'Quantity must be integer >=0');
  }
  request.validatedBody = { quantity };
  next();
};

export const validateMenuPayload = (request, response, next) => {
  const { name, price, category } = request.body;
  if (!name || !price || price < 0 || !category) {
    throw new ApiError(400, 'name, price (>0), category required');
  }
  next();
};

