export const Hero = ({ featured }) => (
  <section className="hero relative">
    <div className="hero-bg absolute inset-0 bg-[url('/Images/bonda.jpg')] bg-cover bg-center brightness-50" />
    <div className="hero-content relative z-10 text-center max-w-4xl mx-auto px-8">
      <kbd className="slash-cmd bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full text-sm font-mono">/baba</kbd>
      <h1 className="hero-title text-7xl md:text-8xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6">
        Baba Canteen
      </h1>
      <p className="text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
        Fast. Simple. Campus Food.
      </p>
      <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/menu" className="btn btn-primary text-lg px-8 py-4 shadow-xl">Open Menu ⌘K</a>
        <button className="btn btn-secondary text-lg px-8 py-4">View Cart</button>
      </div>
      <div className="hero-featured mt-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map(item => (
          <div key={item.id} className="block-card p-0">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-2xl" />
            <div className="p-6">
              <div className="flex gap-2 mb-2">
                <span className="category-chip px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">Special</span>
              </div>
              <h3 className="block-title text-xl font-bold mb-2">{item.name}</h3>
              <p className="block-desc text-slate-600 dark:text-slate-400 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <kbd className="price-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-sm font-mono">₹{item.price}</kbd>
                <button className="btn btn-primary px-6 py-2">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

