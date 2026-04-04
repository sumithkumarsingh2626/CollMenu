import { icons } from "./icons.js";
import { formatCurrency } from "../utils/app-utils.js";

function createSkeletonCards() {
    return Array.from({ length: 8 }, () => `
        <article class="menu-card skeleton-card">
            <div class="skeleton shimmer media-skeleton"></div>
            <div class="skeleton shimmer title-skeleton"></div>
            <div class="skeleton shimmer text-skeleton"></div>
            <div class="skeleton shimmer text-skeleton short"></div>
            <div class="skeleton shimmer footer-skeleton"></div>
        </article>
    `).join("");
}

function createEmptyState() {
    return `
        <div class="empty-state" data-reveal>
            <img src="./assets/placeholder-food.svg" alt="No items found">
            <h3>No dishes match your search yet.</h3>
            <p>Try another keyword or reset the filters to see the full canteen menu.</p>
            <button type="button" class="button-secondary" data-action="reset-filters">
                Reset filters
            </button>
        </div>
    `;
}

function createMenuCard(item, cartQuantity) {
    return `
        <article class="menu-card" data-reveal>
            <div class="card-media">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                    data-fallback="./assets/placeholder-food.svg"
                >
                <span class="category-badge">${item.category}</span>
                <span class="tag-badge">${item.tag}</span>
            </div>

            <div class="card-content">
                <div class="card-heading">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <span class="rating-pill">${icons.star}${item.rating}</span>
                </div>

                <div class="card-meta">
                    <span class="meta-pill">${icons.clock}${item.prepTime}</span>
                    <span class="meta-pill">Ready for pickup</span>
                </div>

                <div class="price-row">
                    <div class="price-copy">
                        <strong>${formatCurrency(item.price)}</strong>
                        <small>${cartQuantity > 0 ? `${cartQuantity} in cart` : "Single serving"}</small>
                    </div>

                    <button
                        type="button"
                        class="card-action ${cartQuantity > 0 ? "is-added" : ""}"
                        data-action="add-to-cart"
                        data-item-id="${item.id}"
                    >
                        ${icons.plus}
                        ${cartQuantity > 0 ? "Add one more" : "Add to cart"}
                    </button>
                </div>
            </div>
        </article>
    `;
}

export function createMenuSection({ categories, activeCategory, query, items, cartMap, isLoading }) {
    return `
        <section class="menu-section-shell" id="menu">
            <div class="section-heading" data-reveal>
                <div>
                    <span class="section-label">Curated menu</span>
                    <h2>Built for quick discovery, not endless scrolling.</h2>
                </div>
                <p>
                    Search dishes, switch categories, and add items instantly with live pricing updates.
                </p>
            </div>

            <div class="toolbar-card" data-reveal>
                <label class="search-field" aria-label="Search menu items">
                    ${icons.search}
                    <input
                        type="search"
                        value="${query}"
                        placeholder="Search dosa, coffee, thali..."
                        data-role="search"
                    >
                </label>

                <div class="filter-group" aria-label="Menu categories">
                    ${categories
                        .map(
                            (category) => `
                                <button
                                    type="button"
                                    class="filter-chip ${category === activeCategory ? "is-active" : ""}"
                                    data-action="set-category"
                                    data-category="${category}"
                                >
                                    ${category}
                                </button>
                            `
                        )
                        .join("")}
                </div>
            </div>

            <div class="results-summary">
                <span>${isLoading ? "Loading menu..." : `${items.length} dishes available`}</span>
                <span>Pickup only · Frontend demo</span>
            </div>

            <div class="menu-grid">
                ${isLoading
                    ? createSkeletonCards()
                    : items.length
                        ? items.map((item) => createMenuCard(item, cartMap.get(item.id) ?? 0)).join("")
                        : createEmptyState()}
            </div>
        </section>
    `;
}
