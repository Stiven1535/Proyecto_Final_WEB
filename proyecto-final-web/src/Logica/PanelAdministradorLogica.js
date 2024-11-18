// PanelAdministradorLogic.js
import { useNavigate } from 'react-router-dom';

export const usePanelAdministradorLogic = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    navigate('/');  // Redirige a la página de login
  };

  // Función para ver las bitácoras
  const handleViewBitacoras = () => {
    navigate('/lista');  // Redirige a la vista de Bitácoras
  };

  // Función para gestionar usuarios
  const handleViewUsuarios = () => {
    navigate('/administrarusuario');  // Redirige a la vista de Administración de Usuarios
  };

  // Función para gestionar categorías
  const handleViewCategorias = () => {
    navigate('/administrarcategoria');  // Redirige a la vista de Administración de Categorías
  };

  const handleViewmapa = () => {
    navigate('/mapa');  // Redirige a la vista de Administración de Categorías
  };

  return {
    handleLogout,
    handleViewBitacoras,
    handleViewUsuarios,
    handleViewCategorias,
    handleViewmapa,
  };
};
