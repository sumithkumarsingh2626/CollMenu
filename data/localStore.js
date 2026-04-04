import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { menuSeed } from "./menuSeed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseFile = path.join(__dirname, "local-database.json");

let cache = null;

function createSeededMenu() {
    const timestamp = new Date().toISOString();

    return menuSeed.map((item) => ({
        ...item,
        _id: randomUUID(),
        createdAt: timestamp,
        updatedAt: timestamp
    }));
}

async function persistStore() {
    await mkdir(__dirname, { recursive: true });
    await writeFile(databaseFile, JSON.stringify(cache, null, 2), "utf-8");
}

export async function initializeLocalStore() {
    if (cache) {
        return cache;
    }

    try {
        const raw = await readFile(databaseFile, "utf-8");
        cache = JSON.parse(raw);
    } catch {
        cache = {
            cart: [],
            menu: createSeededMenu(),
            orders: []
        };

        await persistStore();
    }

    return cache;
}

function touchRecord(record) {
    return {
        ...record,
        updatedAt: new Date().toISOString()
    };
}

export async function listMenuItems() {
    const store = await initializeLocalStore();
    return [...store.menu];
}

export async function findMenuItemById(itemId) {
    const store = await initializeLocalStore();
    return store.menu.find((item) => item._id === itemId) || null;
}

export async function createMenuItem(payload) {
    const store = await initializeLocalStore();
    const timestamp = new Date().toISOString();

    const newItem = {
        ...payload,
        _id: randomUUID(),
        createdAt: timestamp,
        updatedAt: timestamp
    };

    store.menu.push(newItem);
    await persistStore();
    return newItem;
}

export async function updateMenuItem(itemId, payload) {
    const store = await initializeLocalStore();
    const index = store.menu.findIndex((item) => item._id === itemId);

    if (index === -1) {
        return null;
    }

    store.menu[index] = touchRecord({
        ...store.menu[index],
        ...payload
    });

    await persistStore();
    return store.menu[index];
}

export async function deleteMenuItem(itemId) {
    const store = await initializeLocalStore();
    const existingItem = store.menu.find((item) => item._id === itemId);

    if (!existingItem) {
        return null;
    }

    store.menu = store.menu.filter((item) => item._id !== itemId);
    store.cart = store.cart.filter((item) => item.itemId !== itemId);
    await persistStore();
    return existingItem;
}

export async function listCartItems() {
    const store = await initializeLocalStore();

    return store.cart
        .map((cartItem) => {
            const menuItem = store.menu.find((item) => item._id === cartItem.itemId);

            if (!menuItem) {
                return null;
            }

            return {
                ...cartItem,
                item: menuItem
            };
        })
        .filter(Boolean);
}

export async function addCartItem(itemId, quantity) {
    const store = await initializeLocalStore();
    const menuItem = store.menu.find((item) => item._id === itemId);

    if (!menuItem) {
        return null;
    }

    const existingItem = store.cart.find((item) => item.itemId === itemId);

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.updatedAt = new Date().toISOString();
    } else {
        const timestamp = new Date().toISOString();

        store.cart.push({
            _id: randomUUID(),
            itemId,
            quantity,
            createdAt: timestamp,
            updatedAt: timestamp
        });
    }

    await persistStore();
    return store.cart.find((item) => item.itemId === itemId) || null;
}

export async function updateCartItem(cartItemId, quantity) {
    const store = await initializeLocalStore();
    const index = store.cart.findIndex((item) => item._id === cartItemId);

    if (index === -1) {
        return null;
    }

    store.cart[index] = touchRecord({
        ...store.cart[index],
        quantity
    });

    await persistStore();
    return store.cart[index];
}

export async function deleteCartItem(cartItemId) {
    const store = await initializeLocalStore();
    const existingItem = store.cart.find((item) => item._id === cartItemId);

    if (!existingItem) {
        return null;
    }

    store.cart = store.cart.filter((item) => item._id !== cartItemId);
    await persistStore();
    return existingItem;
}

export async function clearCart() {
    const store = await initializeLocalStore();
    store.cart = [];
    await persistStore();
}

export async function createOrderFromCart() {
    const store = await initializeLocalStore();
    const enrichedCart = await listCartItems();

    if (!enrichedCart.length) {
        return null;
    }

    const timestamp = new Date().toISOString();
    const items = enrichedCart.map((cartItem) => ({
        category: cartItem.item.category,
        image: cartItem.item.image,
        itemId: cartItem.item._id,
        lineTotal: cartItem.item.price * cartItem.quantity,
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity
    }));

    const order = {
        _id: randomUUID(),
        createdAt: timestamp,
        items,
        orderedAt: timestamp,
        status: "pending",
        total: items.reduce((sum, item) => sum + item.lineTotal, 0),
        updatedAt: timestamp
    };

    store.orders.unshift(order);
    store.cart = [];
    await persistStore();
    return order;
}

export async function listOrders() {
    const store = await initializeLocalStore();
    return [...store.orders];
}

export async function findOrderById(orderId) {
    const store = await initializeLocalStore();
    return store.orders.find((order) => order._id === orderId) || null;
}
