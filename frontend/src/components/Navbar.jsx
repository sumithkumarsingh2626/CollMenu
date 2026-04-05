import { Link } from 'react-router-dom'

export const Navbar = ({ cartCount }) => (
  <nav className="topbar">
    <Link to="/" className="logo">Baba Canteen</Link>
    <div className="search">
      <input placeholder="/ Search menu..." />
    </div>
    <div className="actions">
      <Link to="/menu">Menu</Link>
      <Link to="/cart" className="btn-primary">
        Cart ({cartCount})
      </Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
)

