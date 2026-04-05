export function createHeroSection({ featuredItems = [] } = {}) {
  const featuredBlocks = featuredItems.slice(0, 3).map(item => 
    createBlockCard({
      image: item.image,
      title: item.name,
      description: item.description.substring(0, 80) + '...',
      price: item.price,
      category: item.category,
      itemId: item.id,
      className: 'hero-block'
    })
  ).join('');

  return `
    <section class="hero" id="top">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-gradient"></div>
        <div class="hero-text">
          <kbd class="slash-cmd">/baba</kbd>
          <h1 class="hero-title magnetic">Baba Canteen</h1>
          <p>Your campus food block.</p>
          <div class="hero-ctas">
            <a href="#menu" class="btn btn-primary magnetic" data-action="scroll-to-menu">Open Menu ⌘K</a>
            <button class="btn btn-secondary magnetic" data-action="open-cart">Cart</button>
          </div>
        </div>
        <div class="hero-featured">
          ${featuredBlocks}
        </div>
      </div>
    </section>
  `;
}
