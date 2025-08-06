import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Productos.css';

const Productos = () => {
  const { idCategoria } = useParams(); // ← Captura la categoría si hay
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    const url = idCategoria
      ? `https://dummyjson.com/products/category/${encodeURIComponent(idCategoria)}`
      : 'https://dummyjson.com/products';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then(data => {
        const productosCargados = idCategoria ? data.products : data.products;
        setProductos(productosCargados);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, [idCategoria]);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="productos-container">
      <h1>{idCategoria ? `Productos de ${idCategoria}` : 'Todos los productos'}</h1>
      <div className="productos-lista">
        {productos.map(producto => (
          <Link to={`/productos/${producto.id}`} key={producto.id} className="producto-card">
            <img src={producto.thumbnail} alt={producto.title} />
            <h3>{producto.title}</h3>
            <p>${producto.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Productos;
