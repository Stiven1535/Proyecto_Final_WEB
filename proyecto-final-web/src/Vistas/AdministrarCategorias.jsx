import React from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Iconos
import useAdministrarCategoriasLogica from '../Logica/AdministrarCategoriasLogica'; // Lógica

const AdministrarCategorias = () => {
  const {
    categories,
    addCategory,
    goBackToAdminPanel,
    deleteCategory,
    viewDetails,
    editCategory, // Función para editar categorías
  } = useAdministrarCategoriasLogica(); // Llamada al hook de la lógica

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Categorías de muestreo</h3>
      
      <Row className="mb-4">
        <Col>
          <Button variant="success" className="mb-2" onClick={addCategory}>
            Nueva categoría
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Tipo de ecosistema</th>
            <th>Estación del año</th>
            <th>Cantidad de Bitácoras</th>
            <th style={{ width: '30%' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">No hay registros</td>
            </tr>
          ) : (
            categories.map(category => (
              <tr key={category.id} className="text-center">
                <td>{category.ecosystemType}</td>
                <td>{category.season}</td>
                <td>{category.quantityBitacoras}</td>
                <td className="d-flex justify-content-center">
                  <Button variant="success" className="me-2" onClick={() => viewDetails(category.id)}>
                    <FaEye /> Ver detalles
                  </Button>
                  <Button 
                    variant="warning" 
                    className="me-2"
                    onClick={() => editCategory(category.id)} // Redirigir a edición
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FaTrash /> Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col>
          <Button variant="secondary" onClick={goBackToAdminPanel} className="w-auto">
            Volver al Panel de administrador
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdministrarCategorias;
