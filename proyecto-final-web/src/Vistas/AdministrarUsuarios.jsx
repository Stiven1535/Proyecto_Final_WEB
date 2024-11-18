import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, navigateToRegistrar, navigateToEditar } from '../Logica/AdministrarUsuarioLogica';

const AdmininstrarUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      setError('');
      await deleteUser(userIdToDelete, password);

      // Actualizar la lista de usuarios
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setShowPasswordModal(false);
      setPassword('');
    } catch (error) {
      setError(error.message || 'Error al eliminar el usuario');
    }
  };

  const handleShowPasswordModal = (userId) => {
    setUserIdToDelete(userId);
    setShowPasswordModal(true);
    setError('');
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setError('');
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Gestión de usuarios</h2>
      <Row className="my-4">
        <Col>
          <Button variant="success" className="mb-2" onClick={() => navigateToRegistrar(navigate)}>
            <FaUserPlus /> Registrar Usuario
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Email</th>
            <th>Género</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td>{user.nombreCompleto}</td>
              <td>{user.email}</td>
              <td>{user.genero}</td>
              <td>{user.rol}</td>
              <td className="d-flex justify-content-center">
                <Button variant="warning" onClick={() => navigateToEditar(navigate, user.id)} className="me-2">
                  <FaEdit /> Editar
                </Button>
                <Button variant="danger" onClick={() => handleShowPasswordModal(user.id)}>
                  <FaTrash /> Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-3">
        <Col className="text-left">
          <Button variant="secondary" onClick={() => navigate('/paneladministrador')}>
            Volver al panel de administrador
          </Button>
        </Col>
      </Row>

      <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPassword">
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
          <Button variant="secondary" onClick={handleClosePasswordModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdmininstrarUsuarios;
