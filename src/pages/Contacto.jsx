import './Contacto.css';

const Contacto = () => {
  return (
    <div>
      <h1>Contacto</h1>
      <p>¿Tenés alguna duda sobre nuestros celulares? Escribinos:</p>
      <form>
        <div>
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="tucorreo@email.com" />
        </div>
        <div>
          <label>Mensaje</label>
          <textarea placeholder="Escribí tu mensaje"></textarea>
        </div>
        <button type="button">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
