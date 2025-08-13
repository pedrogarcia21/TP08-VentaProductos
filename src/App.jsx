import { Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/categoria/:idCategoria" element={<Productos />} />
        <Route path="productos/:idProducto" element={<ProductoDetalle />} />
        <Route path="contacto" element={<Contacto />} />
        {/* Ruta catch-all para 404 */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App