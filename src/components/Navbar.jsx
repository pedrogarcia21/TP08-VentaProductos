import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategorias(data));
  }, []);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">TP8 - Venta de Productos</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
          <li className="dropdown">
            <span>Productos</span>
            <ul className="dropdown-menu">
              <li><Link to="/productos">Ver todos</Link></li>
              {categorias.map(cat => (
                <li key={cat}>
                  <Link to={`/productos/categoria/${cat}`}>{cat}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
  
}
export default Navbar;
