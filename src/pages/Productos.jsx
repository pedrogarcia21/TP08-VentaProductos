import { useEffect, useState } from "react";
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then(data => {
        setProductos(data.products);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="productos-container">
      <h1>Productos</h1>
      <div className="productos-lista">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <img src={producto.thumbnail} alt={producto.title} />
            <h3>{producto.title}</h3>
            <p>${producto.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
