import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useRestablecerPasswordLogic } from '../Logica/RestablecerPasswordLogica';  // Importa la lógica

function RestablecerPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { handleVolverClick, handleRestablecerPassword } = useRestablecerPasswordLogic(setError, setMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRestablecerPassword(email);
  };

  return (
    <Container className="text-center mt-5">
      <h2>Restablecer contraseña</h2>
      <div className="my-4">
        <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
      </div>
      <Row className="justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex align-items-center border rounded p-2 mb-3">
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                className="border-0"
                style={{ boxShadow: 'none' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bi bi-envelope ms-2" style={{ fontSize: '1.5rem' }}></i>
            </Form.Group>
            <Button variant="success" className="w-100" type="submit">
              Generar nueva contraseña
            </Button>
          </Form>
        </Col>
      </Row>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      <div className="mt-3">
        <a href="#" className="text-decoration-none" onClick={handleVolverClick}>Volver</a>
      </div>
    </Container>
  );
}

export default RestablecerPassword;