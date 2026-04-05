export function createMenuSection({
  items = [],
  categories = [],
  activeCategory = 'All',
  searchTerm = '',
  featuredItems = []
} = {}) {
  const categoryMarkup = categories
    .map(
      (category) => `
        <button
          class="menu-pill${category === activeCategory ? ' is-active' : ''}"
          type="button"
          data-action="set-category"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join('');

  const specialsMarkup = featuredItems
    .map((item) => {
      // Inline block-card for non-import
      return `
        <article class="menu-block block-card magnetic special-block" data-item-id="${item.id}" data-action="add-to-cart">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy" />` : ''}
          <div class="block-content">
            <div class="block-meta">
              <span class="category-chip">⭐ Special</span>
              <kbd class="price-mono">₹${item.price}</kbd>
            </div>
            <h3 class="block-title">${item.name}</h3>
            <p class="block-desc">${item.description}</p>
            <div class="block-actions">
              <button class="btn btn-primary btn-small">Quick Add</button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  const itemsMarkup = items.length
    ? items
        .map(
          (item) => `
            <article class="menu-card" data-reveal>
              <div class="menu-card__image-wrap">
                <img class="menu-card__image" src="${item.image}" alt="${item.name}" loading="lazy" />
              </div>
              <div class="menu-card__content">
                <div class="menu-card__meta">
                  <span class="menu-card__category">${item.category}</span>
                  <span class="menu-card__price">₹${item.price}</span>
                </div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button
                  class="button button--small"
                  type="button"
                  data-action="add-to-cart"
                  data-item-id="${item.id}"
                >
                  Add
                </button>
              </div>
            </article>
          `
        )
        .join('')
    : `
      <div class="empty-state" data-reveal>
        <h3>No items found</h3>
        <p>Try another search term or switch to a different category.</p>
      </div>
    `;

  return `
    <section class="section section--soft" id="specials">
      <div class="container">
        <div class="section-heading" data-reveal>
          <span class="section-heading__eyebrow">Today's Specials</span>
          <h2>Popular picks around campus</h2>
          <p>Freshly prepared favourites students order the most.</p>
        </div>
        <div class="specials-grid">
          ${specialsMarkup}
        </div>
      </div>
    </section>

    <section class="section" id="menu">
      <div class="container">
        <div class="section-heading" data-reveal>
          <span class="section-heading__eyebrow">Menu</span>
          <h2>Browse everything in one place</h2>
          <p>Search quickly, switch categories, and add your order in seconds.</p>
        </div>

        <div class="menu-toolbar" data-reveal>
          <label class="menu-search" for="menu-search">
            <span class="sr-only">Search menu</span>
            <input
              id="menu-search"
              name="menu-search"
              type="search"
              placeholder="Search food or drinks"
              value="${searchTerm}"
              data-action="search-menu"
            />
          </label>
          <div class="menu-pills" role="tablist" aria-label="Menu categories">
            ${categoryMarkup}
          </div>
        </div>

        <div class="menu-grid">
          ${itemsMarkup}
        </div>
      </div>
    </section>
  `;
}