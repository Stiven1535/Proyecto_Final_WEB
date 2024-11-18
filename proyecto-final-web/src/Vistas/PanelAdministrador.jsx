import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserShield, FaClipboard, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { usePanelAdministradorLogic } from '../Logica/PanelAdministradorLogica'; // Importa la lógica

const PanelAdministrador = ({ nombreAdministrador }) => {
  const {
    handleLogout,
    handleViewBitacoras,
    handleViewUsuarios,
    handleViewCategorias,
  } = usePanelAdministradorLogic(); // Usa la lógica

  return (
    <Container fluid className="p-0">
      {/* Barra de navegación superior */}
      <nav className="bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h2 style={{ color: 'green' }} className="mb-0 me-4">Bitacora Botanica</h2>
          <div className="d-flex align-items-center">
            <FaUserShield className="me-2" size={20} />
            <span className="h5 mb-0">{nombreAdministrador}</span>
          </div>
        </div>
        <Button variant="outline-light" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </Button>
      </nav>

      <Container className="py-4">
        {/* Tarjetas de Acciones */}
        <Row className="mb-4">
          {/* Tarjeta de Gestión de Bitácoras */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Gestión de Bitácoras</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaClipboard size={48} className="mb-3 text-success" />
                <p>Administra y revisa todas las bitácoras del sistema.</p>
                <Button variant="success" className="mt-auto w-100" onClick={handleViewBitacoras}>
                  Administrar Bitácoras
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta de Gestión de Usuarios */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">Gestión de Usuarios</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaUsers size={48} className="mb-3 text-secondary" />
                <p className="text-secondary">Administra usuarios y permisos del sistema.</p>
                <Button variant="secondary" className="mt-auto w-100" onClick={handleViewUsuarios}>
                  Gestionar Usuarios
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta de Gestión de Categorías */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">Gestión de Categorías</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <FaClipboard size={48} className="mb-3 text-info" />
                <p>Administra y gestiona las categorías dentro del sistema.</p>
                <Button variant="info" className="mt-auto w-100 text-white" onClick={handleViewCategorias}>
                  Gestionar Categorías
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-4">
        <p className="text-muted mb-0">Panel Administrativo - Bitacora Botanica © 2024</p>
      </footer>
    </Container>
  );
};

export default PanelAdministrador;
