// AgregarCategoria.jsx (Componente modificado)
import React from 'react';
import { Button, Form, Container, Col } from 'react-bootstrap';
import useAgregarCategoriaLogica from '../Logica/AgregarCategoriaLogica';

const AgregarCategoria = ({ onSave }) => {
  const {
    ecosystemType,
    setEcosystemType,
    season,
    setSeason,
    bitacoraId,
    setBitacoraId,
    bitacoras,
    saveCategory,
    goBack,
  } = useAgregarCategoriaLogica(onSave);

  return (
    <Container className="mt-4">
      <h2 className="text-center">Agregar Nueva Categoría de Muestreo</h2>
      <Form className="mt-4">
        <Col md={6} className="mx-auto">
          <Form.Group controlId="ecosystemType" className="mb-3">
            <Form.Label>Tipo de Ecosistema</Form.Label>
            <Form.Control
              as="select"
              value={ecosystemType}
              onChange={(e) => setEcosystemType(e.target.value)}
            >
              <option value="">Seleccione el tipo de ecosistema</option>
              <option value="Bosque">Bosque</option>
              <option value="Desierto">Desierto</option>
              <option value="Montaña">Montaña</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="season" className="mb-3">
            <Form.Label>Estación del Año</Form.Label>
            <Form.Control
              as="select"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="">Seleccione la estación</option>
              <option value="Primavera">Primavera</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="bitacora" className="mb-3">
            <Form.Label>Seleccionar Bitácora</Form.Label>
            <Form.Control
              as="select"
              value={bitacoraId}
              onChange={(e) => setBitacoraId(e.target.value)}
            >
              <option value="">Seleccione una bitácora</option>
              {bitacoras.map(bitacora => (
                <option key={bitacora.id} value={bitacora.id}>
                  {bitacora.titulo}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button 
            variant="success" 
            onClick={saveCategory} 
            className="mt-3 me-2"
            disabled={!ecosystemType || !season || !bitacoraId}
          >
            Guardar Categoría
          </Button>
          <Button variant="secondary" onClick={goBack} className="mt-3">
            Volver
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default AgregarCategoria;
