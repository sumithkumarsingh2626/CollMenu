import { addItemToCart, deleteCartItemById, getCartItems, updateCartItemById } from "../services/dataStore.js";
import { ApiError } from "../utils/apiError.js";
import { serializeCartItem } from "../utils/serializers.js";

function buildCartResponse(cartItems) {
    const serializedItems = cartItems.map(serializeCartItem);
    const total = serializedItems.reduce((sum, item) => sum + item.lineTotal, 0);

    return {
        itemCount: serializedItems.reduce((sum, item) => sum + item.quantity, 0),
        items: serializedItems,
        total
    };
}

export async function fetchCartItems(request, response, next) {
    try {
        const cartItems = await getCartItems();

        response.status(200).json({
            success: true,
            data: buildCartResponse(cartItems)
        });
    } catch (error) {
        next(error);
    }
}

export async function addCartItemHandler(request, response, next) {
    try {
        const cartItem = await addItemToCart(request.validatedBody.itemId, request.validatedBody.quantity);

        response.status(201).json({
            success: true,
            message: "Item added to cart successfully.",
            data: serializeCartItem(cartItem)
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCartItemHandler(request, response, next) {
    try {
        const cartItem = await updateCartItemById(request.params.id, request.validatedBody.quantity);

        if (!cartItem) {
            throw new ApiError(404, "Cart item not found.");
        }

        response.status(200).json({
            success: true,
            message: "Cart quantity updated successfully.",
            data: serializeCartItem(cartItem)
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteCartItemHandler(request, response, next) {
    try {
        const cartItem = await deleteCartItemById(request.params.id);

        if (!cartItem) {
            throw new ApiError(404, "Cart item not found.");
        }

        response.status(200).json({
            success: true,
            message: "Cart item removed successfully."
        });
    } catch (error) {
        next(error);
    }
}
