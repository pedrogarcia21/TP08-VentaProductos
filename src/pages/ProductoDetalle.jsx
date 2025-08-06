import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './ProductoDetalle.css';

const ProductoDetalle = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${idProducto}`)
      .then(res => {
        return res.json();
      })
      .then(data => setProducto(data))
      .catch(err => setError(err.message));
  }, [idProducto]);

  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-imagen">
        <img src={producto.thumbnail} alt={producto.title} />
      </div>
      <div className="detalle-info">
        <h1>{producto.title}</h1>
        <p className="detalle-descripcion">{producto.description}</p>
        <p className="detalle-precio">${producto.price}</p>
        <p><strong>Marca:</strong> {producto.brand}</p>
        <p><strong>Categoría:</strong> {producto.category}</p>
        <button className="detalle-boton">Comprar ahora</button>
      </div>
    </div>
  );
};

export default ProductoDetalle;
