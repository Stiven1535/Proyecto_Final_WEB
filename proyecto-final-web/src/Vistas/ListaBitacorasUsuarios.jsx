import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import useBitacoras2 from '../Logica/ListaBitacorasLogica2';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Logica/firebaseConfig';

function ListaBitacorasUsuarios() {
  const {
    bitacoras,
    filteredBitacoras,
    filters,
    setFilters,
    handleFilterChange,
    handleDelete
  } = useBitacoras2();

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'usuarios', userData.userId));
            if (userDoc.exists()) {
              const userDocData = userDoc.data();
              setUserRole(userDocData.rol);
              setCurrentUserId(userData.userId);
            }
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
        }
      }
    };

    getUserData();
  }, []);

  const handleView = (bitacoraId) => {
    navigate(`/bitacora2/${bitacoraId}`);
  };

  const handleEdit = (bitacoraId) => {
    navigate(`/editarbitacora2/${bitacoraId}`);
  };

  const handleBack = () => {
    navigate('/panelusuario');
  };

  const renderActionButtons = (bitacora) => {
    // Verificar si el usuario actual es el creador de la bitácora
    const isCreator = bitacora.usuarioId === currentUserId;

    return (
      <div className="d-flex justify-content-center">
        {/* Botón Ver detalles - visible para todos */}
        <Button 
          variant="success" 
          className="me-2" 
          onClick={() => handleView(bitacora.id)}
        >
          <FaEye /> Ver detalles
        </Button>

        {/* Botones Editar y Eliminar - solo visibles para Investigadores que son creadores */}
        {userRole === 'Investigador' && isCreator && (
          <>
            <Button 
              variant="warning" 
              className="me-2" 
              onClick={() => handleEdit(bitacora.id)}
            >
              <FaEdit /> Editar
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleDelete(bitacora.id)}
            >
              <FaTrash /> Eliminar
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Lista de bitácoras</h3>

      <Row className="mb-4">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar bitácora"
            onChange={(e) => {
              const searchValue = e.target.value.toLowerCase();
              setFilters(prev => ({ ...prev, search: searchValue }));
            }}
          />
        </Col>
      </Row>

      <div className="border p-3 mb-4">
        <h5 className="text-center">Filtros</h5>
        <Row className="text-center">
          <Col md={3}>
            <label>Rango de fecha</label>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                name="fechaInicio"
                value={filters.fechaInicio}
                onChange={handleFilterChange}
              />
              <input
                type="date"
                className="form-control"
                name="fechaFin"
                value={filters.fechaFin}
                onChange={handleFilterChange}
              />
            </div>
          </Col>
          <Col md={3}>
            <label>Ubicación</label>
            <input
              type="text"
              className="form-control"
              name="ubicacion"
              value={filters.ubicacion}
              onChange={handleFilterChange}
              placeholder="Latitud o Longitud"
            />
          </Col>
          <Col md={3}>
            <label>Clima</label>
            <input
              type="text"
              className="form-control"
              name="clima"
              value={filters.clima}
              onChange={handleFilterChange}
              placeholder="Clima"
            />
          </Col>
          <Col md={3}>
            <label>Tipo de hábitat</label>
            <input
              type="text"
              className="form-control"
              name="habitat"
              value={filters.habitat}
              onChange={handleFilterChange}
              placeholder="Hábitat"
            />
          </Col>
        </Row>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Nombre Bitácora</th>
            <th>Fecha</th>
            <th>Clima</th>
            <th style={{ width: '30%' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredBitacoras.length > 0 ? (
            filteredBitacoras.map((bitacora) => (
              <tr key={bitacora.id} className="text-center">
                <td>{bitacora.titulo}</td>
                <td>{bitacora.fecha}</td>
                <td>{bitacora.clima}</td>
                <td>{renderActionButtons(bitacora)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No se encontraron bitácoras
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col>
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            className="w-auto"
          >
            Volver al Panel de Usuario
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ListaBitacorasUsuarios;