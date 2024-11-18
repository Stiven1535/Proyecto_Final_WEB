import React from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLoginFormLogic } from '../Logica/LoginForm';

const LoginForm = ({ setNombreUsuario }) => {
  const navigate = useNavigate();
  const { 
    formData, 
    error, 
    handleChange, 
    handleSubmit, 
    handleRegistroClick, 
    handleRecuperarClick 
  } = useLoginFormLogic(setNombreUsuario);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulación de login, en un caso real se debería hacer una validación
    const usuario = formData.email;  // Aquí puedes extraer el nombre o el email según lo que quieras mostrar
    const isUserFound = await handleSubmit(e);
    if (isUserFound) {
      setNombreUsuario(usuario);  // Asigna el nombre del usuario (aquí utilizamos el email como ejemplo)
      navigate('/panelusuario');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="text-center w-100" style={{ maxWidth: '400px' }}>
        <h1>Inicio de sesión</h1>
        <Col className="d-flex justify-content-center my-3">
          <FaUserCircle size={80} />
        </Col>
        <Col xs={12}>
          <Form onSubmit={handleLogin}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaEyeSlash />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </InputGroup>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="success" type="submit" className="w-100 mb-3">
              Iniciar sesión
            </Button>
          </Form>
          
          {/* Contenedor para los enlaces de registro y recuperación */}
          <Container className="px-0">
            <Row className="justify-content-between">
              <Col xs={6} className="text-start ps-0">
                <Button
                  variant="link"
                  onClick={handleRegistroClick}
                  className="text-decoration-underline p-0"
                  style={{ color: 'black' }}
                >
                  Registrarse
                </Button>
              </Col>
              <Col xs={6} className="text-end pe-0">
                <Button
                  variant="link"
                  onClick={handleRecuperarClick}
                  className="text-decoration-underline p-0"
                  style={{ color: 'black' }}
                >
                  Recuperar contraseña
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
