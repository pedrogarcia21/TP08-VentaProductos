import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bannerImage from '../assets/Banner.jpg';

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProductosDestacados(data.products))
      .catch(console.error);

    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const productos = data.products;
        for (let i = productos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [productos[i], productos[j]] = [productos[j], productos[i]];
        }
        setOfertas(productos.slice(0, 12));
        setTodosLosProductos(productos);
      })
      .catch(console.error);

    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // Búsqueda global en todos los productos
  useEffect(() => {
    if (busqueda.trim() === "") {
      setResultadosBusqueda([]);
      return;
    }
    const resultados = todosLosProductos.filter(producto =>
      producto.title.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultadosBusqueda(resultados);
  }, [busqueda, todosLosProductos]);

  // Filtro de búsqueda y precio para ofertas
  const ofertasFiltradas = ofertas.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(busqueda.toLowerCase());
    const coincideMin = precioMin === "" || producto.price >= Number(precioMin);
    const coincideMax = precioMax === "" || producto.price <= Number(precioMax);
    return coincideBusqueda && coincideMin && coincideMax;
  });

  // Carrito ficticio
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((prod, idx) => idx !== id));
  };

  const totalCarrito = carrito.reduce((acc, prod) => acc + prod.price, 0);

  return (
    <div>
      {/* Búsqueda global */}
      <section className="busqueda-global">
        <input
          type="text"
          placeholder="Buscar en toda la tienda..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="input-busqueda-global"
        />
      </section>

      {/* Resultados de búsqueda */}
      {busqueda.trim() !== "" && (
        <section className="resultados-busqueda">
          <h2>Resultados de búsqueda</h2>
          <div className="productos-grid">
            {resultadosBusqueda.length === 0 ? (
              <p style={{ gridColumn: "1/-1", color: "#888" }}>No se encontraron productos.</p>
            ) : (
              resultadosBusqueda.map((producto) => (
                <Link
                  key={producto.id}
                  to={`/productos/${producto.id}`}
                  className="producto-card"
                >
                  <img src={producto.thumbnail} alt={producto.title} />
                  <h3>{producto.title}</h3>
                  <p>${producto.price}</p>
                </Link>
              ))
            )}
          </div>
        </section>
      )}

      {/* Hero */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Explorá los mejores productos online</h1>
          <p>Lo último en tecnología, moda y más</p>
          <Link to="/productos" className="btn-primary">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* Beneficios */}
      <section className="beneficios-home">
        <h2>¿Por qué elegirnos?</h2>
        <div className="beneficios-grid">
          <div className="beneficio-card">
            <span role="img" aria-label="Envío rápido" className="beneficio-icon">🚚</span>
            <h4>Envío rápido</h4>
            <p>Recibí tus productos en tiempo récord a todo el país.</p>
          </div>
          <div className="beneficio-card">
            <span role="img" aria-label="Pago seguro" className="beneficio-icon">🔒</span>
            <h4>Pago seguro</h4>
            <p>Protegemos tus datos y te ofrecemos múltiples medios de pago.</p>
          </div>
          <div className="beneficio-card">
            <span role="img" aria-label="Soporte" className="beneficio-icon">💬</span>
            <h4>Soporte 24/7</h4>
            <p>Te acompañamos en todo momento para resolver tus dudas.</p>
          </div>
          <div className="beneficio-card">
            <span role="img" aria-label="Mejores precios" className="beneficio-icon">🏷️</span>
            <h4>Mejores precios</h4>
            <p>Ofertas y descuentos exclusivos en toda la tienda.</p>
          </div>
        </div>
      </section>


      {/* Modal Carrito */}
      {mostrarCarrito && (
        <div className="carrito-modal-bg" onClick={() => setMostrarCarrito(false)}>
          <div className="carrito-modal" onClick={e => e.stopPropagation()}>
            <h3>Carrito</h3>
            {carrito.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              <ul>
                {carrito.map((prod, idx) => (
                  <li key={idx} className="carrito-item">
                    <img src={prod.thumbnail} alt={prod.title} />
                    <span>{prod.title}</span>
                    <span>${prod.price}</span>
                    <button onClick={() => quitarDelCarrito(idx)}>Quitar</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="carrito-total">
              Total: <b>${totalCarrito.toFixed(2)}</b>
            </div>
            <button className="carrito-cerrar" onClick={() => setMostrarCarrito(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Ofertas de la semana */}
      <section className="ofertas-home">
        <h2>Ofertas de la semana</h2>
        <div className={`productos-grid fade-in ${fadeIn ? "visible" : ""}`}>
          {ofertasFiltradas.length === 0 ? (
            <p style={{ gridColumn: "1/-1", color: "#888" }}>No hay productos que coincidan.</p>
          ) : (
            ofertasFiltradas.slice(0, 4).map((producto) => (
              <div key={producto.id} className="producto-card">
                <img src={producto.thumbnail} alt={producto.title} />
                <h3>{producto.title}</h3>
                <p>
                  <span style={{ color: "#3a4ed7", fontWeight: 700 }}>
                    ${producto.price}
                  </span>
                  {producto.discountPercentage && (
                    <span style={{ color: "#e53935", marginLeft: 8, fontSize: "0.95rem" }}>
                      -{Math.round(producto.discountPercentage)}%
                    </span>
                  )}
                </p>
                <button
                  className="btn-agregar"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="productos-home">
        <h2>Productos destacados</h2>
        <div className="productos-grid fade-in visible">
          {productosDestacados.map((producto) => (
            <Link
              key={producto.id}
              to={`/productos/${producto.id}`}
              className="producto-card"
            >
              <img src={producto.thumbnail} alt={producto.title} />
              <h3>{producto.title}</h3>
              <p>${producto.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;