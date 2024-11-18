import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../Logica/AdministrarUsuarioLogica';

const EditarUsuarioAdmin = () => {
  const [user, setUser] = useState({
    nombreCompleto: '',
    genero: '',
    rol: '',
    email: '',
    password: '',
  });

  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        if (userData) {
          setUser({
            nombreCompleto: userData.nombreCompleto || '',
            genero: userData.genero || '',
            rol: userData.rol || '',
            email: userData.email || '',
            password: '',
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowPasswordModal = (e) => {
    e.preventDefault();
    setShowPasswordModal(true);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setError('');

      const updatedUser = { ...user };
      if (updatedUser.password === '') {
        delete updatedUser.password; // No actualizar contraseña si está vacía.
      }

      await updateUser(userId, updatedUser, password); // Verificación con contraseña de admin.

      setShowPasswordModal(false);
      navigate('/administrarusuario');
    } catch (error) {
      setError(error.message || 'Error al actualizar el usuario');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Editar Usuario</h2>

      <div className="text-center mb-3">
        <FaUserCircle size={80} />
      </div>

      <Form onSubmit={handleShowPasswordModal}>
        <Form.Group as={Row} className="mb-3" controlId="formFullName">
          <Form.Label column sm="3">Nombre completo</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={user.nombreCompleto}
              onChange={handleChange}
              placeholder="Agregar texto"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGender">
          <Form.Label column sm="3">Género</Form.Label>
          <Col sm="9">
            <Form.Select
              name="genero"
              value={user.genero || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formRole">
          <Form.Label column sm="3">Rol</Form.Label>
          <Col sm="9">
            <Form.Select
              name="rol"
              value={user.rol || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Administrador">Administrador</option>
              <option value="Investigador">Investigador</option>
              <option value="Colaborador">Colaborador</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm="3">Correo electrónico</Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Agregar texto"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPasswordInput">
          <Form.Label column sm="3">Contraseña</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="password"
              value={user.password || ''}
              onChange={handleChange}
              placeholder="Dejar vacío para no cambiar"
            />
          </Col>
        </Form.Group>

        <div className="text-center">
          <Button variant="success" type="submit">
            Guardar cambios
          </Button>
        </div>
      </Form>

      <div className="text-center mt-3">
        <Button variant="link" onClick={() => navigate('/administrarusuario')}>
          Volver
        </Button>
      </div>

      {/* Modal de contraseña */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cambios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPasswordModal">
              <Form.Label>Introduce la contraseña de administrador</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditarUsuarioAdmin;
