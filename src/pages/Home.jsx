  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import "./Home.css"; 
  import bannerImage from '../assets/Banner.jpgg'; 

  function Home() {
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
      // Traer categorías
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => setCategorias(data))
        .catch(console.error);

      // Traer algunos productos destacados, por ejemplo primeros 4 de la lista general
      fetch("https://dummyjson.com/products?limit=4")
        .then((res) => res.json())
        .then((data) => setProductosDestacados(data.products))
        .catch(console.error);
    }, []);

    return (
      <div>
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

        {/* Categorías */}
        <section className="categorias-home">
    <h2>Categorías destacadas</h2>
    <div className="categorias-grid">
      {categorias.length > 0 &&
        categorias.slice(0, 4).map((categoria) => (
          <Link
            key={categoria}
            to={`/productos/categoria/${encodeURIComponent(categoria)}`}
            className="categoria-card"
          >
            <div className="categoria-contenido">
              {typeof categoria === "string" ? categoria.toUpperCase() : ""}
            </div>
          </Link>
        ))}
    </div>
  </section>

        {/* Productos destacados */}
        <section className="productos-home">
          <h2>Productos destacados</h2>
          <div className="productos-grid">
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
