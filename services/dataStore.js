import mongoose from "mongoose";
import { isMongoEnabled } from "../config/database.js";
import * as localStore from "../data/localStore.js";
import { menuSeed } from "../data/menuSeed.js";
import CartItem from "../models/CartItem.js";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import { ApiError } from "../utils/apiError.js";

function ensureMongoId(id, label = "id") {
    if (!isMongoEnabled()) {
        return;
    }

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, `Invalid ${label}.`);
    }
}

function buildOrderItems(cartItems) {
    return cartItems.map((cartItem) => ({
        category: cartItem.itemId.category,
        image: cartItem.itemId.image,
        itemId: cartItem.itemId._id,
        lineTotal: cartItem.itemId.price * cartItem.quantity,
        name: cartItem.itemId.name,
        price: cartItem.itemId.price,
        quantity: cartItem.quantity
    }));
}

export async function initializeDataStore() {
    if (isMongoEnabled()) {
        const menuCount = await MenuItem.countDocuments();

        if (menuCount === 0) {
            await MenuItem.insertMany(menuSeed);
        }

        return;
    }

    await localStore.initializeLocalStore();
}

export async function getAllMenuItems() {
    if (isMongoEnabled()) {
        return MenuItem.find().sort({ category: 1, name: 1 }).lean();
    }

    return localStore.listMenuItems();
}

export async function getMenuItemById(itemId) {
    ensureMongoId(itemId, "menu item id");

    if (isMongoEnabled()) {
        return MenuItem.findById(itemId).lean();
    }

    return localStore.findMenuItemById(itemId);
}

export async function createMenuItem(payload) {
    if (isMongoEnabled()) {
        const newItem = await MenuItem.create(payload);
        return MenuItem.findById(newItem._id).lean();
    }

    return localStore.createMenuItem(payload);
}

export async function updateMenuItemById(itemId, payload) {
    ensureMongoId(itemId, "menu item id");

    if (isMongoEnabled()) {
        return MenuItem.findByIdAndUpdate(itemId, payload, {
            new: true,
            runValidators: true
        }).lean();
    }

    return localStore.updateMenuItem(itemId, payload);
}

export async function deleteMenuItemById(itemId) {
    ensureMongoId(itemId, "menu item id");

    if (isMongoEnabled()) {
        const deletedItem = await MenuItem.findByIdAndDelete(itemId).lean();

        if (deletedItem) {
            await CartItem.deleteMany({ itemId });
        }

        return deletedItem;
    }

    return localStore.deleteMenuItem(itemId);
}

export async function getCartItems() {
    if (isMongoEnabled()) {
        return CartItem.find()
            .populate("itemId")
            .sort({ createdAt: -1 })
            .lean();
    }

    return localStore.listCartItems();
}

export async function addItemToCart(itemId, quantity) {
    ensureMongoId(itemId, "itemId");

    if (isMongoEnabled()) {
        const menuItem = await MenuItem.findById(itemId).lean();

        if (!menuItem) {
            throw new ApiError(404, "Menu item not found.");
        }

        let cartItem = await CartItem.findOne({ itemId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({ itemId, quantity });
        }

        return CartItem.findById(cartItem._id).populate("itemId").lean();
    }

    const createdCartItem = await localStore.addCartItem(itemId, quantity);

    if (!createdCartItem) {
        throw new ApiError(404, "Menu item not found.");
    }

    const cartItems = await localStore.listCartItems();
    return cartItems.find((item) => item._id === createdCartItem._id) || null;
}

export async function updateCartItemById(cartItemId, quantity) {
    ensureMongoId(cartItemId, "cart item id");

    if (isMongoEnabled()) {
        const updatedItem = await CartItem.findByIdAndUpdate(
            cartItemId,
            { quantity },
            { new: true, runValidators: true }
        )
            .populate("itemId")
            .lean();

        return updatedItem;
    }

    const updatedCartItem = await localStore.updateCartItem(cartItemId, quantity);

    if (!updatedCartItem) {
        return null;
    }

    const cartItems = await localStore.listCartItems();
    return cartItems.find((item) => item._id === updatedCartItem._id) || null;
}

export async function deleteCartItemById(cartItemId) {
    ensureMongoId(cartItemId, "cart item id");

    if (isMongoEnabled()) {
        return CartItem.findByIdAndDelete(cartItemId).lean();
    }

    return localStore.deleteCartItem(cartItemId);
}

export async function placeOrder() {
    if (isMongoEnabled()) {
        const cartItems = await CartItem.find().populate("itemId");

        if (!cartItems.length) {
            throw new ApiError(400, "Cart is empty.");
        }

        const items = buildOrderItems(cartItems);
        const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
        const newOrder = await Order.create({
            items,
            total
        });

        await CartItem.deleteMany({});
        return Order.findById(newOrder._id).lean();
    }

    const order = await localStore.createOrderFromCart();

    if (!order) {
        throw new ApiError(400, "Cart is empty.");
    }

    return order;
}

export async function getOrders() {
    if (isMongoEnabled()) {
        return Order.find().sort({ orderedAt: -1 }).lean();
    }

    return localStore.listOrders();
}

export async function getOrderById(orderId) {
    ensureMongoId(orderId, "order id");

    if (isMongoEnabled()) {
        return Order.findById(orderId).lean();
    }

    return localStore.findOrderById(orderId);
}
