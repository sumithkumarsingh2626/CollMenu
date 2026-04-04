import {
    createMenuItem,
    deleteMenuItemById,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItemById
} from "../services/dataStore.js";
import { ApiError } from "../utils/apiError.js";
import { serializeMenuItem } from "../utils/serializers.js";

export async function fetchMenuItems(request, response, next) {
    try {
        const items = await getAllMenuItems();

        response.status(200).json({
            success: true,
            count: items.length,
            data: items.map(serializeMenuItem)
        });
    } catch (error) {
        next(error);
    }
}

export async function fetchMenuItemById(request, response, next) {
    try {
        const item = await getMenuItemById(request.params.id);

        if (!item) {
            throw new ApiError(404, "Menu item not found.");
        }

        response.status(200).json({
            success: true,
            data: serializeMenuItem(item)
        });
    } catch (error) {
        next(error);
    }
}

export async function createMenuItemHandler(request, response, next) {
    try {
        const item = await createMenuItem(request.validatedBody);

        response.status(201).json({
            success: true,
            message: "Menu item created successfully.",
            data: serializeMenuItem(item)
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMenuItemHandler(request, response, next) {
    try {
        const item = await updateMenuItemById(request.params.id, request.validatedBody);

        if (!item) {
            throw new ApiError(404, "Menu item not found.");
        }

        response.status(200).json({
            success: true,
            message: "Menu item updated successfully.",
            data: serializeMenuItem(item)
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMenuItemHandler(request, response, next) {
    try {
        const item = await deleteMenuItemById(request.params.id);

        if (!item) {
            throw new ApiError(404, "Menu item not found.");
        }

        response.status(200).json({
            success: true,
            message: "Menu item deleted successfully.",
            data: serializeMenuItem(item)
        });
    } catch (error) {
        next(error);
    }
}
