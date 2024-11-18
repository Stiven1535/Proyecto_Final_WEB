import React from 'react';
import { Container, Card, Table, Button, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaThermometerHalf, FaTree, FaEye } from 'react-icons/fa';
import useCategoriaDetallesLogica from '../Logica/CategoriaDetallesLogica';

const CategoriaDetalles = () => {
  const { categoryId } = useParams();
  const {
    category,
    bitacoras,
    loading,
    error,
    goBack
  } = useCategoriaDetallesLogica(categoryId);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <h3>Cargando detalles...</h3>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <h3>Error al cargar los detalles</h3>
        <p>{error}</p>
        <Button variant="primary" onClick={goBack}>
          <FaArrowLeft /> Volver
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Información de la Categoría */}
      <Card className="mb-4">
        <Card.Header>
          <h3 className="mb-0">Detalles de la Categoría</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <FaTree className="me-2" />
                <strong>Tipo de Ecosistema:</strong> {category?.ecosystemType}
              </p>
              <p>
                <FaThermometerHalf className="me-2" />
                <strong>Estación del Año:</strong> {category?.season}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Total de Bitácoras:</strong>{' '}
                <Badge bg="info">{bitacoras?.length || 0}</Badge>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Lista de Bitácoras */}
      <h4 className="mb-3">Bitácoras en esta Categoría</h4>
      {bitacoras?.length === 0 ? (
        <Card className="text-center p-4">
          <p className="mb-0">No hay bitácoras registradas en esta categoría</p>
        </Card>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Ubicación</th>
              <th>Clima</th>
              <th>Hábitat</th>
              <th>Especies Registradas</th>
            </tr>
          </thead>
          <tbody>
            {bitacoras?.map((bitacora) => (
              <tr key={bitacora.id}>
                <td>{bitacora.titulo}</td>
                <td>
                  <FaCalendarAlt className="me-1" />
                  {new Date(bitacora.fecha).toLocaleDateString()}
                  <br />
                  <small>{bitacora.hora}</small>
                </td>
                <td>
                  <FaMapMarkerAlt className="me-1" />
                  Lat: {bitacora.latitud}
                  <br />
                  Long: {bitacora.longitud}
                </td>
                <td>{bitacora.clima}</td>
                <td>{bitacora.habitat}</td>
                <td className="text-center">
                  {/* Botón centrado */}
                  <Button 
                    variant="success" 
                    className="me-2" 
                    onClick={() => window.location.href = `/bitacora/${bitacora.id}`}
                  >
                    <FaEye /> Ver especies
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Button variant="secondary" onClick={goBack} className="mt-3">
        <FaArrowLeft /> Volver a Categorías
      </Button>
    </Container>
  );
};

export default CategoriaDetalles;
