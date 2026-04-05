const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
});

export function formatCurrency(value) {
    return currencyFormatter.format(value);
}

export function wait(duration) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration);
    });
}

export function loadStoredCart(storageKey) {
    try {
        const rawCart = window.localStorage.getItem(storageKey);
        const parsedCart = rawCart ? JSON.parse(rawCart) : [];
        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
        return [];
    }
}

export function saveStoredCart(storageKey, cartItems) {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(cartItems));
    } catch {
        // Storage should never break the ordering flow.
    }
}
