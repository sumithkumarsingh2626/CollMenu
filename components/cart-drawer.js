function createCartItemsMarkup(cartItems) {
  if (!cartItems.length) {
    return `
      <div class="cart-empty-state">
        <h3>Your cart is empty</h3>
        <p>Add a few favourites from Baba Canteen to get started.</p>
      </div>
    `;
  }

  return cartItems
    .map(
      (item) => `
        <article class="cart-item">
          <img class="cart-item__image" src="${item.image}" alt="${item.name}" loading="lazy" />
          <div class="cart-item__content">
            <div class="cart-item__header">
              <div>
                <h3>${item.name}</h3>
                <p>${item.category}</p>
              </div>
              <strong>₹${item.price * item.quantity}</strong>
            </div>

            <div class="cart-item__footer">
              <div class="quantity-control" aria-label="Quantity controls">
                <button type="button" data-action="decrease-quantity" data-item-id="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase-quantity" data-item-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>

              <button
                class="cart-item__remove"
                type="button"
                data-action="remove-from-cart"
                data-item-id="${item.id}"
              >
                Remove
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join('');
}

export function createCartDrawer({
  cartItems = [],
  totalItems = 0,
  subtotal = 0,
  isOpen = false
} = {}) {
  return `
    <div class="bottom-sheet cart-sheet${isOpen ? ' open' : ''}" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div class="sheet-handle">
        <div class="handle-bar"></div>
      </div>
      <header class="sheet-header">
        <div>
          <span>Your Order</span>
          <h2>Cart (${totalItems})</h2>
        </div>
        <button class="icon-btn" data-action="close-cart" aria-label="Close">×</button>
      </header>
      <div class="sheet-body">
        ${createCartItemsMarkup(cartItems)}
      </div>
      <footer class="sheet-footer">
        <div class="summary-grid">
          <span>Subtotal</span><strong>₹${subtotal}</strong>
          <span>Packaging</span><strong>₹12</strong>
          <span>Tax</span><strong>₹${Math.round(subtotal * 0.05)}</strong>
          <div class="total-row">
            <strong>Total</strong><strong>₹${Math.round(subtotal * 1.05 + 12)}</strong>
          </div>
        </div>
        <button class="btn btn-primary btn-full" data-action="place-order"${cartItems.length ? '' : ' disabled'}>
          Place Order
        </button>
        <div class="upi-preview">
          <img src="../upi-qr.jpg" alt="UPI QR - Scan to pay" />
          <p>Or scan UPI QR at pickup</p>
        </div>
      </footer>
    </div>
  `;
}
