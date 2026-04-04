function normalizeId(value) {
    if (!value) {
        return null;
    }

    if (typeof value === "string") {
        return value;
    }

    if (value._id) {
        return normalizeId(value._id);
    }

    if (value.id) {
        return String(value.id);
    }

    return String(value);
}

export function serializeMenuItem(document) {
    if (!document) {
        return null;
    }

    return {
        category: document.category,
        createdAt: document.createdAt || null,
        description: document.description || "",
        id: normalizeId(document._id || document.id),
        image: document.image,
        name: document.name,
        prepTime: document.prepTime || "",
        price: document.price,
        rating: document.rating || "",
        tag: document.tag || "",
        updatedAt: document.updatedAt || null
    };
}

export function serializeCartItem(document) {
    if (!document) {
        return null;
    }

    const resolvedItem = document.item || document.itemId;
    const item = resolvedItem && typeof resolvedItem === "object" ? serializeMenuItem(resolvedItem) : null;
    const itemId = item?.id || normalizeId(document.itemId);
    const unitPrice = item?.price || document.price || 0;

    return {
        createdAt: document.createdAt || null,
        id: normalizeId(document._id || document.id),
        item,
        itemId,
        lineTotal: unitPrice * document.quantity,
        quantity: document.quantity,
        updatedAt: document.updatedAt || null
    };
}

export function serializeOrder(document) {
    if (!document) {
        return null;
    }

    const orderedAt = document.orderedAt || document.timestamp || document.createdAt || null;

    return {
        createdAt: document.createdAt || null,
        id: normalizeId(document._id || document.id),
        items: (document.items || []).map((item) => ({
            category: item.category,
            image: item.image,
            itemId: normalizeId(item.itemId),
            lineTotal: item.lineTotal,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        orderedAt,
        status: document.status,
        timestamp: orderedAt,
        total: document.total,
        updatedAt: document.updatedAt || null
    };
}
