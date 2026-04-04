import { icons } from "./icons.js";
import { formatCurrency } from "../utils/app-utils.js";

function createCartItem(item) {
    return `
        <article class="cart-item">
            <img src="${item.image}" alt="${item.name}" loading="lazy" data-fallback="./assets/placeholder-food.svg">

            <div class="cart-item-copy">
                <div class="cart-item-top">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.category}</p>
                    </div>

                    <button
                        type="button"
                        class="ghost-icon danger"
                        aria-label="Remove ${item.name}"
                        data-action="remove-item"
                        data-item-id="${item.id}"
                    >
                        ${icons.trash}
                    </button>
                </div>

                <div class="cart-item-bottom">
                    <div class="stepper">
                        <button type="button" class="ghost-icon" data-action="decrease-item" data-item-id="${item.id}">
                            ${icons.minus}
                        </button>
                        <span>${item.quantity}</span>
                        <button type="button" class="ghost-icon" data-action="increase-item" data-item-id="${item.id}">
                            ${icons.plus}
                        </button>
                    </div>

                    <strong>${formatCurrency(item.lineTotal)}</strong>
                </div>
            </div>
        </article>
    `;
}

export function createCartDrawer({ isOpen, cartItems, totalItems, subtotal, serviceFee, taxes, total, isProcessing }) {
    return `
        <div class="drawer-overlay ${isOpen ? "is-open" : ""}" data-action="close-cart"></div>

        <aside class="cart-drawer ${isOpen ? "is-open" : ""}" aria-hidden="${!isOpen}">
            <div class="drawer-header">
                <div>
                    <p class="drawer-label">Your cart</p>
                    <h2>${totalItems} item${totalItems === 1 ? "" : "s"} ready</h2>
                </div>
                <button type="button" class="icon-button" aria-label="Close cart" data-action="close-cart">
                    ${icons.close}
                </button>
            </div>

            <div class="drawer-body">
                ${cartItems.length
                    ? `
                        <div class="cart-list">
                            ${cartItems.map((item) => createCartItem(item)).join("")}
                        </div>
                      `
                    : `
                        <div class="empty-cart">
                            <img src="./assets/placeholder-food.svg" alt="Empty cart">
                            <h3>Your cart is still empty.</h3>
                            <p>Add a few campus favorites to see quantity controls and live totals here.</p>
                            <button type="button" class="button-secondary" data-action="close-cart">
                                Browse dishes
                            </button>
                        </div>
                      `}
            </div>

            <div class="drawer-footer">
                <div class="summary-grid">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <strong>${formatCurrency(subtotal)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Packaging</span>
                        <strong>${formatCurrency(serviceFee)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Taxes</span>
                        <strong>${formatCurrency(taxes)}</strong>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <strong>${formatCurrency(total)}</strong>
                    </div>
                </div>

                <p class="drawer-note">Campus pickup only · Estimated ready time 12-15 minutes.</p>

                <button
                    type="button"
                    class="checkout-button ${isProcessing ? "is-loading" : ""}"
                    data-action="checkout"
                    ${cartItems.length === 0 || isProcessing ? "disabled" : ""}
                >
                    ${isProcessing ? "Placing order..." : "Place order"}
                </button>
            </div>
        </aside>
    `;
}
