import { icons } from "./icons.js";

export function createHeroSection({ featuredItems, cartCount }) {
    return `
        <section class="hero-section" id="top">
            <div class="hero-copy" data-reveal>
                <span class="eyebrow">
                    ${icons.sparkles}
                    Premium campus ordering
                </span>

                <h1>College canteen food, redesigned with a smoother ordering flow.</h1>
                <p>
                    Browse hot meals, filter by category, and keep your order ready with a live cart that feels more
                    like a real food app than a classroom demo.
                </p>

                <div class="hero-actions">
                    <button type="button" class="button-primary" data-action="scroll-to-menu">
                        Explore menu
                        ${icons.arrowRight}
                    </button>
                    <button type="button" class="button-secondary" data-action="open-cart">
                        View cart
                        <span class="secondary-pill">${cartCount}</span>
                    </button>
                </div>

                <div class="hero-metrics">
                    <article class="metric-card">
                        <span>${icons.clock}</span>
                        <strong>12-15 min pickup</strong>
                        <p>Fast canteen dispatch during class breaks.</p>
                    </article>
                    <article class="metric-card">
                        <span>${icons.star}</span>
                        <strong>Top-rated picks</strong>
                        <p>Popular combos surfaced first for easy decisions.</p>
                    </article>
                    <article class="metric-card">
                        <span>${icons.bag}</span>
                        <strong>${cartCount} item${cartCount === 1 ? "" : "s"} live</strong>
                        <p>Your cart stays synced while you browse.</p>
                    </article>
                </div>
            </div>

            <div class="hero-panel" data-reveal>
                <div class="hero-panel-card">
                    <div class="panel-header">
                        <div>
                            <p class="panel-label">Today at Baba Canteen</p>
                            <h2>Fresh picks your campus keeps coming back for.</h2>
                        </div>
                        <span class="panel-chip">Curated daily</span>
                    </div>

                    <div class="featured-stack">
                        ${featuredItems
                            .map(
                                (item) => `
                                    <article class="featured-card">
                                        <img src="${item.image}" alt="${item.name}" loading="lazy" data-fallback="./assets/placeholder-food.svg">
                                        <div>
                                            <p>${item.category}</p>
                                            <h3>${item.name}</h3>
                                            <span>${item.tag} · ${item.prepTime}</span>
                                        </div>
                                        <strong>₹${item.price}</strong>
                                    </article>
                                `
                            )
                            .join("")}
                    </div>

                    <div class="status-bar">
                        <span>Fresh batches all day</span>
                        <span>No broken image gaps</span>
                        <span>Responsive across devices</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}
