import { getOrderById, getOrders, placeOrder } from "../services/dataStore.js";
import { ApiError } from "../utils/apiError.js";
import { serializeOrder } from "../utils/serializers.js";

export async function placeOrderHandler(request, response, next) {
    try {
        const order = await placeOrder();

        response.status(201).json({
            success: true,
            message: "Order placed successfully.",
            data: serializeOrder(order)
        });
    } catch (error) {
        next(error);
    }
}

export async function fetchOrders(request, response, next) {
    try {
        const orders = await getOrders();

        response.status(200).json({
            success: true,
            count: orders.length,
            data: orders.map(serializeOrder)
        });
    } catch (error) {
        next(error);
    }
}

export async function fetchOrderById(request, response, next) {
    try {
        const order = await getOrderById(request.params.id);

        if (!order) {
            throw new ApiError(404, "Order not found.");
        }

        response.status(200).json({
            success: true,
            data: serializeOrder(order)
        });
    } catch (error) {
        next(error);
    }
}
