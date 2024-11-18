// RegistrarUsuario.jsx
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import { useRegistrarUsuarioLogic } from '../Logica/RegistrarUsuarioAdminLogica'; // Importa la lógica

function RegistrarUsuarioAdmin() {
  const {
    formData,
    formErrors,
    error,
    handleChange,
    handleSubmit,
  } = useRegistrarUsuarioLogic(); // Usamos la lógica importada

  const navigate = useNavigate(); // Hook para redirigir

  // Función para manejar el clic en "Volver"
  const handleBack = () => {
    navigate('/administrarusuario'); // Redirige a la página de login
  };

  return (
    <Container className="text-center mt-5">
      <h2>Crear usuario</h2> {/* Cambié el título a Crear usuario */}
      <div className="my-4">
        <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
      </div>
      <Row className="justify-content-center">
        <Col xs={10} md={6} lg={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agregar texto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                isInvalid={formErrors.nombreCompleto}
              />
              <Form.Control.Feedback type="invalid">{formErrors.nombreCompleto}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="genero"
                value={formData.genero} // Usamos el valor controlado aquí
                onChange={handleChange}
                isInvalid={formErrors.genero}
              >
                <option value="Seleccionar">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formErrors.genero}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Agregar texto"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={formErrors.email}
              />
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Agregar texto"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={formErrors.password}
              />
              <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Agregar texto"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={formErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Button variant="success" type="submit" className="w-100">
              Crear usuario
            </Button>
          </Form>
        </Col>
      </Row>
      <div className="mt-3">
        <a href="#" onClick={handleBack} className="text-decoration-none">Volver</a>
      </div>
    </Container>
  );
}

export default RegistrarUsuarioAdmin;
