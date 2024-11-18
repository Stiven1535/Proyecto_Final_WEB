// RegistrarUsuarioLogic.js
import { useState } from 'react';
import { db } from './firebaseConfig'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importa Firestore methods

export const useRegistrarUsuarioLogic = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    genero: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    nombreCompleto: '',
    genero: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Limpiar errores en tiempo real al modificar los campos
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const errors = {};

    // Validación de campos vacíos
    if (!formData.nombreCompleto) {
      errors.nombreCompleto = 'Este campo es obligatorio';
      isValid = false;
    }

    if (!formData.genero || formData.genero === 'Seleccionar') {
      errors.genero = 'Este campo es obligatorio';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Este campo es obligatorio';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Este campo es obligatorio';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Este campo es obligatorio';
      isValid = false;
    }

    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return; // No continuar si hay errores
    }

    try {
      // Guardar los datos en la colección "usuarios" en Firestore
      await addDoc(collection(db, 'usuarios'), {
        nombreCompleto: formData.nombreCompleto,
        genero: formData.genero,
        email: formData.email,
        password: formData.password,
      });
      return 'Usuario registrado exitosamente';
    } catch (e) {
      console.error('Error al registrar el usuario: ', e);
      setError('Error al registrar el usuario');
    }
  };

  return {
    formData,
    formErrors,
    error,
    handleChange,
    handleSubmit,
  };
};
