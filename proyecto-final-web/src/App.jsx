// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BitacoraResumen from './Vistas/BitacoraResumen';
import BitacoraForm from './Vistas/BitacoraForm';
import ListaBitacoras from './Vistas/ListaBitacoras';
import LoginForm from './Vistas/LoginForm';
import RestablecerPassword from './Vistas/RestablecerPassword';
import RegistrarUsuario from './Vistas/RegistrarUsuario';
import RegistrarUsuarioAdmin from './Vistas/RegistrarUsuarioAdmin';
import PanelAdministrador from './Vistas/PanelAdministrador';
import PanelUsuario from './Vistas/PanelUsuario';
import AdministrarUsuarios from './Vistas/AdministrarUsuarios';
import AdministrarCategorias from './Vistas/AdministrarCategorias';
import AgregarCategoria from './Vistas/AgregarCategoria';
import EditarUsuarioAdmin from './Vistas/EditarUsuarioAdmin';
import ListaBitacorasUsuarios from './Vistas/ListaBitacorasUsuarios';
import BitacoraResumenUsuarios from './Vistas/BitacoraResumenUsuarios';
import CategoriaDetalles from './Vistas/CategoriaDetalles';
import EditarCategoria from './Vistas/EditarCategoria';
import EditarBitacora from './Vistas/EditarBitacora';
import Mapa from './Vistas/Mapa'; // Nueva importación

function App() {
  const [bitacoraData, setBitacoraData] = useState(null);
  const [bitacoraData2, setBitacoraData2] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');

  const handleSave = (data) => {
    setBitacoraData(data);
  };

  const handleSave2 = (data) => {
    setBitacoraData2(data);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/detalles1" element={<BitacoraResumen bitacoraData={bitacoraData} />} />
          <Route path="/detalles2" element={<BitacoraResumenUsuarios bitacoraData2={bitacoraData2} />} />
          <Route path="/form" element={<BitacoraForm onSave={handleSave} />} />
          <Route path="/form" element={<BitacoraForm onSave={handleSave2} />} />
          <Route path="/lista" element={<ListaBitacoras />} />
          <Route path="/listausuarios" element={<ListaBitacorasUsuarios />} />
          <Route path="/"element={<LoginForm setNombreUsuario={setNombreUsuario} />}/>
          <Route path="/registrar" element={<RegistrarUsuario />} />
          <Route path="/paneladministrador" element={<PanelAdministrador nombreUsuario={nombreUsuario} />} />
          <Route path="/administrarusuario" element={<AdministrarUsuarios />} />
          <Route path="/administrarcategoria" element={<AdministrarCategorias />} />
          <Route path="/agregarcategoria" element={<AgregarCategoria />} />
          <Route path="/panelusuario" element={<PanelUsuario nombreUsuario={nombreUsuario} />}/>
          <Route path="/registrarusuario" element={<RegistrarUsuarioAdmin />} />
          <Route path="/editarusuario/:userId" element={<EditarUsuarioAdmin />} />
          <Route path="/restablecer" element={<RestablecerPassword />} />
          <Route path="/bitacora/:id" element={<BitacoraResumen />} />
          <Route path="/bitacora2/:id" element={<BitacoraResumenUsuarios />} />
          <Route path="/categoria/:categoryId" element={<CategoriaDetalles />} />
          <Route path="/editarcategoria/:categoryId" element={<EditarCategoria />} />
          <Route path="/editarbitacora2/:id" element={<EditarBitacora />} />
          <Route path="/mapa" element={<Mapa />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;