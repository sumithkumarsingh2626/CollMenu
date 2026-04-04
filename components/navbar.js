import { icons } from "./icons.js";

const navItems = [
    { label: "Home", action: "scroll-to-top" },
    { label: "Menu", action: "scroll-to-menu" },
    { label: "Breakfast", action: "set-category", category: "Breakfast" },
    { label: "Lunch", action: "set-category", category: "Lunch" },
    { label: "Snacks", action: "set-category", category: "Snacks" }
];

export function createNavbar({ cartCount, isMenuOpen, activeCategory }) {
    return `
        <header class="site-header">
            <div class="nav-shell">
                <button class="brand-button" type="button" data-action="scroll-to-top" aria-label="Go to top">
                    <img src="./assets/logo-mark.svg" alt="" class="brand-mark">
                    <span class="brand-copy">
                        <strong>CollMenu</strong>
                        <small>Baba Canteen</small>
                    </span>
                </button>

                <nav class="nav-links ${isMenuOpen ? "is-open" : ""}" aria-label="Primary navigation">
                    ${navItems
                        .map((item) => {
                            const isActive = item.category ? activeCategory === item.category : false;

                            return `
                                <button
                                    type="button"
                                    class="nav-link ${isActive ? "is-active" : ""}"
                                    data-action="${item.action}"
                                    ${item.category ? `data-category="${item.category}"` : ""}
                                >
                                    ${item.label}
                                </button>
                            `;
                        })
                        .join("")}
                </nav>

                <div class="nav-actions">
                    <button
                        type="button"
                        class="icon-button nav-toggle"
                        aria-label="Toggle navigation"
                        aria-expanded="${isMenuOpen}"
                        data-action="toggle-menu"
                    >
                        ${icons.menu}
                    </button>

                    <button type="button" class="cart-trigger" data-action="open-cart" aria-label="Open cart">
                        ${icons.bag}
                        <span>Cart</span>
                        <strong class="cart-pill">${cartCount}</strong>
                    </button>
                </div>
            </div>
        </header>
    `;
}
