import { featuredItemIds, categories, menuItems } from "../assets/data/menu-items.js";
import { createCartDrawer } from "../components/cart-drawer.js";
import { createFooter } from "../components/footer.js";
import { createHeroSection } from "../components/hero.js";
import { createMenuSection } from "../components/menu-section.js";
import { createNavbar } from "../components/navbar.js";
import { loadStoredCart, saveStoredCart, wait } from "../utils/app-utils.js";

const STORAGE_KEY = "collmenu-cart";
const PACKAGING_FEE = 12;
const TAX_RATE = 0.05;

function sanitizeCart(cartItems) {
    return cartItems
        .filter((cartItem) => menuItems.some((item) => item.id === cartItem.id))
        .map((cartItem) => ({
            id: cartItem.id,
            quantity: Math.max(1, Number(cartItem.quantity) || 1)
        }));
}

export function initializeHomePage(root) {
    const state = {
        activeCategory: "All",
        cart: sanitizeCart(loadStoredCart(STORAGE_KEY)),
        isCartOpen: false,
        isCheckoutProcessing: false,
        isMenuLoading: true,
        isMenuOpen: false,
        query: "",
        toastMessage: ""
    };

    let toastTimerId = null;

    root.innerHTML = `
        <div class="app-shell">
            <div class="ambient-shape ambient-one"></div>
            <div class="ambient-shape ambient-two"></div>
            <div class="ambient-shape ambient-three"></div>

            <div id="nav-slot"></div>
            <main class="page-main">
                <div id="hero-slot"></div>
                <div id="menu-slot"></div>
            </main>
            <div id="footer-slot"></div>
            <div id="cart-slot"></div>
            <div id="toast-slot"></div>
        </div>
    `;

    const slots = {
        cart: root.querySelector("#cart-slot"),
        footer: root.querySelector("#footer-slot"),
        hero: root.querySelector("#hero-slot"),
        menu: root.querySelector("#menu-slot"),
        nav: root.querySelector("#nav-slot"),
        toast: root.querySelector("#toast-slot")
    };

    const revealObserver =
        typeof window.IntersectionObserver === "function"
            ? new window.IntersectionObserver(
                  (entries) => {
                      entries.forEach((entry) => {
                          if (entry.isIntersecting) {
                              entry.target.classList.add("is-visible");
                              revealObserver.unobserve(entry.target);
                          }
                      });
                  },
                  { threshold: 0.18 }
              )
            : null;

    function getFeaturedItems() {
        return featuredItemIds
            .map((itemId) => menuItems.find((item) => item.id === itemId))
            .filter(Boolean);
    }

    function getCartCount() {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    }

    function getCartMap() {
        return new Map(state.cart.map((item) => [item.id, item.quantity]));
    }

    function getFilteredItems() {
        const normalizedQuery = state.query.trim().toLowerCase();

        return menuItems.filter((item) => {
            const matchesCategory = state.activeCategory === "All" || item.category === state.activeCategory;
            const matchesQuery =
                !normalizedQuery ||
                `${item.name} ${item.category} ${item.description} ${item.tag}`.toLowerCase().includes(normalizedQuery);

            return matchesCategory && matchesQuery;
        });
    }

    function getCartSummary() {
        const cartItems = state.cart
            .map((cartItem) => {
                const item = menuItems.find((menuItem) => menuItem.id === cartItem.id);

                if (!item) {
                    return null;
                }

                return {
                    ...item,
                    quantity: cartItem.quantity,
                    lineTotal: item.price * cartItem.quantity
                };
            })
            .filter(Boolean);

        const subtotal = cartItems.reduce((total, item) => total + item.lineTotal, 0);
        const serviceFee = cartItems.length ? PACKAGING_FEE : 0;
        const taxes = cartItems.length ? Math.round(subtotal * TAX_RATE) : 0;

        return {
            cartItems,
            serviceFee,
            subtotal,
            taxes,
            total: subtotal + serviceFee + taxes,
            totalItems: cartItems.reduce((total, item) => total + item.quantity, 0)
        };
    }

    function persistCart() {
        saveStoredCart(STORAGE_KEY, state.cart);
    }

    function syncBodyState() {
        document.body.classList.toggle("drawer-open", state.isCartOpen);

        const header = root.querySelector(".site-header");
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 10);
        }
    }

    function observeRevealElements() {
        const revealTargets = root.querySelectorAll("[data-reveal]");

        if (!revealObserver) {
            revealTargets.forEach((target) => target.classList.add("is-visible"));
            return;
        }

        revealTargets.forEach((target) => {
            if (target.dataset.revealBound === "true") {
                return;
            }

            target.dataset.revealBound = "true";
            revealObserver.observe(target);
        });
    }

    function renderNavbar() {
        slots.nav.innerHTML = createNavbar({
            activeCategory: state.activeCategory,
            cartCount: getCartCount(),
            isMenuOpen: state.isMenuOpen
        });
        syncBodyState();
    }

    function renderHero() {
        slots.hero.innerHTML = createHeroSection({
            cartCount: getCartCount(),
            featuredItems: getFeaturedItems()
        });
        observeRevealElements();
    }

    function renderMenu({ preserveSearchFocus = false } = {}) {
        const activeElement = document.activeElement;
        const caretPosition = activeElement?.selectionStart ?? null;

        slots.menu.innerHTML = createMenuSection({
            activeCategory: state.activeCategory,
            cartMap: getCartMap(),
            categories,
            isLoading: state.isMenuLoading,
            items: getFilteredItems(),
            query: state.query
        });

        if (preserveSearchFocus && activeElement?.dataset.role === "search") {
            const nextSearchField = slots.menu.querySelector('[data-role="search"]');

            if (nextSearchField) {
                nextSearchField.focus();
                if (caretPosition !== null) {
                    nextSearchField.setSelectionRange(caretPosition, caretPosition);
                }
            }
        }

        observeRevealElements();
    }

    function renderCart() {
        slots.cart.innerHTML = createCartDrawer({
            isOpen: state.isCartOpen,
            isProcessing: state.isCheckoutProcessing,
            ...getCartSummary()
        });
        syncBodyState();
    }

    function renderFooter() {
        slots.footer.innerHTML = createFooter();
        observeRevealElements();
    }

    function renderToast() {
        slots.toast.innerHTML = state.toastMessage
            ? `<div class="toast-banner is-visible">${state.toastMessage}</div>`
            : "";
    }

    function renderApp() {
        renderNavbar();
        renderHero();
        renderMenu();
        renderCart();
        renderFooter();
        renderToast();
        syncBodyState();
        observeRevealElements();
    }

    function pushToast(message) {
        state.toastMessage = message;
        renderToast();

        if (toastTimerId) {
            window.clearTimeout(toastTimerId);
        }

        toastTimerId = window.setTimeout(() => {
            state.toastMessage = "";
            renderToast();
        }, 2600);
    }

    function updateCart(itemId, nextQuantity) {
        const currentItemIndex = state.cart.findIndex((item) => item.id === itemId);

        if (nextQuantity <= 0) {
            state.cart = state.cart.filter((item) => item.id !== itemId);
        } else if (currentItemIndex >= 0) {
            state.cart[currentItemIndex].quantity = nextQuantity;
        } else {
            state.cart = [...state.cart, { id: itemId, quantity: nextQuantity }];
        }

        persistCart();
        renderNavbar();
        renderMenu();
        renderCart();
    }

    function addToCart(itemId) {
        const existingItem = state.cart.find((item) => item.id === itemId);
        const targetItem = menuItems.find((item) => item.id === itemId);

        updateCart(itemId, existingItem ? existingItem.quantity + 1 : 1);

        if (targetItem) {
            pushToast(`${targetItem.name} added to cart.`);
        }
    }

    function scrollToMenu() {
        const menuSection = root.querySelector("#menu");
        menuSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function handleCheckout() {
        if (!state.cart.length || state.isCheckoutProcessing) {
            return;
        }

        state.isCheckoutProcessing = true;
        renderCart();

        await wait(1200);

        state.cart = [];
        state.isCheckoutProcessing = false;
        state.isCartOpen = false;
        persistCart();
        renderNavbar();
        renderMenu();
        renderCart();
        pushToast("Order placed successfully. Pickup will be ready in about 15 minutes.");
    }

    root.addEventListener("click", (event) => {
        const actionTarget = event.target.closest("[data-action]");

        if (!actionTarget) {
            return;
        }

        const { action, category, itemId } = actionTarget.dataset;

        switch (action) {
            case "add-to-cart":
                addToCart(itemId);
                break;
            case "checkout":
                handleCheckout();
                break;
            case "close-cart":
                state.isCartOpen = false;
                renderCart();
                break;
            case "decrease-item": {
                const currentItem = state.cart.find((item) => item.id === itemId);
                if (currentItem) {
                    updateCart(itemId, currentItem.quantity - 1);
                }
                break;
            }
            case "increase-item": {
                const currentItem = state.cart.find((item) => item.id === itemId);
                if (currentItem) {
                    updateCart(itemId, currentItem.quantity + 1);
                }
                break;
            }
            case "open-cart":
                state.isCartOpen = true;
                state.isMenuOpen = false;
                renderNavbar();
                renderCart();
                break;
            case "remove-item":
                updateCart(itemId, 0);
                break;
            case "reset-filters":
                state.activeCategory = "All";
                state.query = "";
                renderNavbar();
                renderMenu();
                break;
            case "scroll-to-menu":
                state.isMenuOpen = false;
                renderNavbar();
                scrollToMenu();
                break;
            case "scroll-to-top":
                state.isMenuOpen = false;
                renderNavbar();
                window.scrollTo({ top: 0, behavior: "smooth" });
                break;
            case "set-category":
                state.activeCategory = category ?? "All";
                state.isMenuOpen = false;
                renderNavbar();
                renderMenu();
                scrollToMenu();
                break;
            case "toggle-menu":
                state.isMenuOpen = !state.isMenuOpen;
                renderNavbar();
                break;
            default:
                break;
        }
    });

    root.addEventListener("input", (event) => {
        if (event.target.matches('[data-role="search"]')) {
            state.query = event.target.value;
            renderMenu({ preserveSearchFocus: true });
        }
    });

    root.addEventListener(
        "error",
        (event) => {
            const target = event.target;

            if (!(target instanceof HTMLImageElement)) {
                return;
            }

            if (!target.dataset.fallback || target.dataset.errorHandled === "true") {
                return;
            }

            target.dataset.errorHandled = "true";
            target.src = target.dataset.fallback;
        },
        true
    );

    window.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        let shouldRenderNavbar = false;
        let shouldRenderCart = false;

        if (state.isMenuOpen) {
            state.isMenuOpen = false;
            shouldRenderNavbar = true;
        }

        if (state.isCartOpen) {
            state.isCartOpen = false;
            shouldRenderCart = true;
        }

        if (shouldRenderNavbar) {
            renderNavbar();
        }

        if (shouldRenderCart) {
            renderCart();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960 && state.isMenuOpen) {
            state.isMenuOpen = false;
            renderNavbar();
        }
    });

    window.addEventListener(
        "scroll",
        () => {
            syncBodyState();
        },
        { passive: true }
    );

    renderApp();

    window.setTimeout(() => {
        state.isMenuLoading = false;
        renderMenu();
    }, 700);
}
