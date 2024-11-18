import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const useLoginFormLogic = (setNombreUsuario) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userRef = collection(db, 'usuarios');
      const q = query(userRef, where('email', '==', formData.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('El correo electrónico no está registrado.');
        return;
      }

      let userFound = false;
      let userFullName = '';
      let userRole = '';
      let userId = '';

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.password === formData.password) {
          userFound = true;
          userFullName = userData.nombreCompleto;
          userRole = userData.rol; // Acceder al rol directamente desde el documento del usuario
          userId = doc.id;
        }
      });

      if (userFound) {
        if (userRole) {
          const userData = {
            nombreCompleto: userFullName,
            rol: userRole,
            userId: userId,  // Guardar el ID del usuario
          };
          localStorage.setItem('userData', JSON.stringify(userData));  // Guardar los datos en localStorage
          setNombreUsuario(userFullName);
          console.log('Usuario guardado en localStorage:', userData);

          if (userRole === 'Administrador') {
            navigate('/panelAdministrador');
          } else if (userRole === 'Colaborador' || userRole === 'Investigador') {
            navigate('/panelusuario');
          } else {
            setError('Rol de usuario no reconocido.');
          }
        } else {
          setError('Rol de usuario no encontrado.');
        }
      } else {
        setError('La contraseña es incorrecta.');
      }
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
      setError('Hubo un error en el inicio de sesión. Inténtalo de nuevo.');
    }
  };

  const handleRegistroClick = () => {
    navigate('/registrar');
  };

  const handleRecuperarClick = () => {
    navigate('/restablecer');
  };

  return {
    formData,
    error,
    handleChange,
    handleSubmit,
    handleRegistroClick,
    handleRecuperarClick,
  };
};
