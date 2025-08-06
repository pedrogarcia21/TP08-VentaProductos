import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} TP8 - Venta de Productos. Todos los derechos reservados.</p>
        <p>Desarrollado por Pedro García y Santiago Varela</p>
      </div>
    </footer>
  );
}

export default Footer;
