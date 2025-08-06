import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
];

function Home() {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Bienvenido a la tienda de productos online</h2>

      <div style={{ position: "relative", marginTop: "2rem" }}>
        <img
          src={images[index]}
          alt={`Imagen ${index + 1}`}
          style={{ width: "100%", borderRadius: "10px", maxHeight: "400px", objectFit: "cover" }}
        />

        <button
          onClick={prevImage}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Imagen anterior"
        >
          ‹
        </button>

        <button
          onClick={nextImage}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
          }}
          aria-label="Imagen siguiente"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Home;
