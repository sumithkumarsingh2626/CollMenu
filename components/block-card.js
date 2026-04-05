/**
 * Reusable Notion-style block card for menu items, features
 */
export function createBlockCard({ 
  image, 
  title, 
  description, 
  price, 
  category, 
  itemId, 
  className = '' 
} = {}) {
  return `
    <article class="menu-block block-card magnetic ${className}" tabindex="0" data-item-id="${itemId}" data-action="add-to-cart">
      ${image ? `<img src="${image}" alt="${title}" loading="lazy" />` : ''}
      <div class="block-content">
        <div class="block-meta">
          <span class="category-chip">${category}</span>
          <kbd class="price-mono">₹${price}</kbd>
        </div>
        <h3 class="block-title">${title}</h3>
        <p class="block-desc">${description}</p>
        <div class="block-actions">
          <button class="btn btn-primary btn-small">Quick Add</button>
        </div>
      </div>
    </article>
  `;
}

