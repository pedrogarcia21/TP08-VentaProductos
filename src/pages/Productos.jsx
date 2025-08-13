import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Productos.css';

const Productos = () => {
  const { idCategoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Filtros y búsqueda
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    setCargando(true);
    setError(null);

    const url = idCategoria
      ? `https://dummyjson.com/products/category/${encodeURIComponent(idCategoria)}`
      : 'https://dummyjson.com/products?limit=100';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then(data => {
        const productosCargados = idCategoria ? data.products : data.products;
        setProductos(productosCargados);
        setCargando(false);
        setTimeout(() => setAnimar(true), 100);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, [idCategoria]);

  // Filtro de búsqueda y precio
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideMin = precioMin === "" || producto.price >= Number(precioMin);
    const coincideMax = precioMax === "" || producto.price <= Number(precioMax);
    return coincideBusqueda && coincideMin && coincideMax;
  });

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="productos-container">
      <h1>{idCategoria ? `Productos de ${idCategoria}` : 'Todos los productos'}</h1>
      <div className="filtros-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <input
          type="number"
          placeholder="Precio mín."
          value={precioMin}
          min={0}
          onChange={e => setPrecioMin(e.target.value)}
          className="input-precio"
        />
        <input
          type="number"
          placeholder="Precio máx."
          value={precioMax}
          min={0}
          onChange={e => setPrecioMax(e.target.value)}
          className="input-precio"
        />
      </div>
      <div className={`productos-lista fade-in ${animar ? "visible" : ""}`}>
        {productosFiltrados.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          productosFiltrados.map(producto => (
            <Link to={`/productos/${producto.id}`} key={producto.id} className="producto-card">
              <img src={producto.thumbnail} alt={producto.title} />
              <h3>{producto.title}</h3>
              <p>${producto.price}</p>
              <button
                className="btn-agregar"
                onClick={e => {
                  e.preventDefault();
                  window.agregarAlCarrito && window.agregarAlCarrito(producto);
                }}
              >
                Agregar al carrito
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;