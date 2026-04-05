export function createNavbar(cartCount = 0) {
  return `
    <header class="topbar" data-action="toggle-menu" aria-label="Primary navigation">
      <div class="topbar-left">
        <a href="#top" class="logo" aria-label="Baba Canteen">BC · Campus Food</a>
      </div>
      
      <div class="search-field">
        <input 
          class="search-input" 
          type="search" 
          placeholder="/ Search menu or slash commands" 
          data-role="search"
          data-action="search-menu"
        />
      </div>

      <div class="topbar-right">
        <button class="icon-btn" data-action="scroll-to-menu" aria-label="Menu" title="⌘ K">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
          </svg>
        </button>
        
        <button class="icon-btn" data-action="theme-toggle" aria-label="Toggle theme" title="Theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>

        <button 
          class="btn btn-primary" 
          data-action="open-cart" 
          aria-label="Cart (${cartCount})"
        >
          Cart
          ${cartCount > 0 ? `<span class="cart-badge">${cartCount}</span>` : ''}
        </button>
      </div>
    </header>
  `;
}
