import { ApiError } from "../utils/apiError.js";

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

function buildMenuPayload(body) {
    return {
        category: body.category?.trim(),
        description: body.description?.trim() || "",
        image: body.image?.trim(),
        name: body.name?.trim(),
        prepTime: body.prepTime?.trim() || "",
        price: Number(body.price),
        rating: body.rating?.trim() || "",
        tag: body.tag?.trim() || ""
    };
}

export function validateMenuPayload(request, response, next) {
    const payload = buildMenuPayload(request.body);
    const errors = [];

    if (!payload.name) {
        errors.push("name is required.");
    }

    if (!Number.isFinite(payload.price) || payload.price < 0) {
        errors.push("price must be a non-negative number.");
    }

    if (!payload.image || !isValidUrl(payload.image)) {
        errors.push("image must be a valid URL.");
    }

    if (!payload.category) {
        errors.push("category is required.");
    }

    if (errors.length) {
        next(new ApiError(400, "Invalid menu item payload.", errors));
        return;
    }

    request.validatedBody = payload;
    next();
}

export function validateCartPayload(request, response, next) {
    const { itemId, quantity } = request.body;
    const normalizedQuantity = Number(quantity ?? 1);
    const errors = [];

    if (!itemId || typeof itemId !== "string") {
        errors.push("itemId is required.");
    }

    if (!Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
        errors.push("quantity must be a positive integer.");
    }

    if (errors.length) {
        next(new ApiError(400, "Invalid cart payload.", errors));
        return;
    }

    request.validatedBody = {
        itemId,
        quantity: normalizedQuantity
    };
    next();
}

export function validateCartQuantityUpdate(request, response, next) {
    const normalizedQuantity = Number(request.body.quantity);

    if (!Number.isInteger(normalizedQuantity) || normalizedQuantity < 1) {
        next(new ApiError(400, "quantity must be a positive integer."));
        return;
    }

    request.validatedBody = {
        quantity: normalizedQuantity
    };
    next();
}
