import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';
import { FaUser, FaClipboard, FaSignOutAlt, FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PanelUsuario = ({ nombreUsuario }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserRole(userData.rol);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleCreateBitacora = () => {
    navigate('/form');
  };

  const handleViewBitacoras = () => {
    navigate('/listausuarios');
  };

  const handleViewMapa = () => {
    navigate('/mapa');
  };

  return (
    <Container fluid className="p-0">
      <Nav className="bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h2 style={{ color: 'green' }} className="mb-0 me-4">Bitacora Botanica</h2>
          <div className="d-flex align-items-center">
            <FaUser className="me-2" size={20} />
            <span className="h5 mb-0">{nombreUsuario}</span>
          </div>
        </div>
        <Button variant="outline-light" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </Button>
      </Nav>

      <Container className="py-4">
        <Row className="mb-4">
          {/* Solo mostrar la tarjeta de Nueva Bitácora si es Investigador */}
          {userRole === 'Investigador' && (
            <Col xs={12} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Nueva Bitácora</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <FaClipboard size={48} className="mb-3 text-success" />
                  <p>Crear una nueva bitácora para registrar tus actividades.</p>
                  <Button variant="success" className="mt-auto w-100" onClick={handleCreateBitacora}>
                    Crear Bitácora
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}

          {/* Tarjeta Lista Bitácoras */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Lista Bitácoras</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaClipboard size={48} className="mb-3 text-primary" />
                <p>Visualiza y gestiona todas tus bitácoras existentes.</p>
                <Button variant="primary" className="mt-auto w-100" onClick={handleViewBitacoras}>
                  Ver Bitácoras
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Mostrar tarjeta de Mapa solo para Colaborador */}
          {userRole === 'Colaborador' && (
            <Col xs={12} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Header className="bg-warning text-white">
                  <h5 className="mb-0">Visualización de Mapa</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <FaMapMarkerAlt size={48} className="mb-3 text-warning" />
                  <p>Visualiza la distribución geográfica de las bitácoras.</p>
                  <Button variant="warning" className="mt-auto w-100" onClick={handleViewMapa}>
                    Ver Mapa
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>

        <Row className="mb-4">
          {/* Tarjeta Mi Perfil */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">Mi Perfil</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaCog size={48} className="mb-3 text-secondary" />
                <p>Actualiza tu información personal y preferencias de cuenta.</p>
                <Button variant="secondary" className="mt-auto w-100">
                  Configuración
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Mostrar tarjeta de Mapa solo para Investigador después de Mi Perfil */}
          {userRole === 'Investigador' && (
            <Col xs={12} md={6} className="mb-4">
              <Card className="h-100">
                <Card.Header className="bg-warning text-white">
                  <h5 className="mb-0">Visualización de Mapa</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <FaMapMarkerAlt size={48} className="mb-3 text-warning" />
                  <p>Visualiza la distribución geográfica de las bitácoras.</p>
                  <Button variant="warning" className="mt-auto w-100" onClick={handleViewMapa}>
                    Ver Mapa
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>

      <footer className="bg-light text-center py-3 mt-4">
        <p className="text-muted mb-0">Sistema de Gestión de Bitácoras © 2024</p>
      </footer>
    </Container>
  );
};

export default PanelUsuario;
