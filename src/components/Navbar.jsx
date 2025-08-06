import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LOGO from '../assets/LOGO.png';
function Navbar() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(error => console.error("Error al cargar categorías:", error));
  }, []);
0
  return (
    <header className="navbar">
      <div className="navbar-container">
      <div className="logo">
  <Link to="/">
    <img src={LOGO} alt="Logo TP8" />
  </Link>
</div>

        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
            <li className="dropdown">
              <span>Productos ▾</span>
              <ul className="dropdown-menu">
                <li><Link to="/productos">Ver todos</Link></li>
                {categorias.map(cat => (
                  <li key={cat.slug || cat}>
                <Link to={`/productos/categoria/${encodeURIComponent(cat.slug || cat)}`}>
                      {cat.name || cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
