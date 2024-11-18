import React from 'react';
import { Button, Form, Container, Col, Card } from 'react-bootstrap';
import useEditarCategoriaLogica from '../Logica/EditarCategoriaLogica';

const EditarCategoria = () => {
  const {
    ecosystemType,
    setEcosystemType,
    season,
    setSeason,
    categoryBitacoras,
    selectedBitacoraId,
    setSelectedBitacoraId,
    saveChanges,
    goBack,
    loading,
  } = useEditarCategoriaLogica();

  if (loading) {
    return (
      <Container className="mt-4">
        <h3 className="text-center">Cargando...</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center">Editar Categoría de Muestreo</h2>
      <Form className="mt-4">
        <Col md={6} className="mx-auto">
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Bitácora a Editar</h5>
            </Card.Header>
            <Card.Body>
              {categoryBitacoras.length > 1 ? (
                <Form.Group controlId="bitacora" className="mb-3">
                  <Form.Label>Seleccionar Bitácora</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedBitacoraId}
                    onChange={(e) => setSelectedBitacoraId(e.target.value)}
                  >
                    <option value="">Seleccione una bitácora</option>
                    {categoryBitacoras.map(bitacora => (
                      <option key={bitacora.id} value={bitacora.id}>
                        {bitacora.titulo}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ) : (
                categoryBitacoras.length === 1 && (
                  <div className="mb-3">
                    <Form.Label>Bitácora Seleccionada</Form.Label>
                    <p className="mb-0 fw-bold">{categoryBitacoras[0].titulo}</p>
                  </div>
                )
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Información de la Categoría</h5>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              onClick={saveChanges}
              className="me-2"
              disabled={!ecosystemType || !season || (categoryBitacoras.length > 1 && !selectedBitacoraId)}
            >
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={goBack}>
              Cancelar
            </Button>
          </div>
        </Col>
      </Form>
    </Container>
  );
};

export default EditarCategoria;