import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/categoria/:idCategoria" element={<Productos />} />
              <Route path="/productos/:idProducto" element={<ProductoDetalle />} />
              <Route path="/contacto" element={<Contacto />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
