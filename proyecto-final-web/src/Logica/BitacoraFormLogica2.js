import { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function useBitacoraFormLogic() {
  const [bitacoraData2, setBitacoraData2] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    latitud: '',
    longitud: '',
    clima: '',
    habitat: '',
    fotografiaSitio: null,
    detallesEspecies: '',
    observaciones: '',
  });

  const [especieData, setEspecieData] = useState({
    nombreCientifico: '',
    nombreComun: '',
    familia: '',
    cantidadMuestras: '',
    estadoPlanta: '',
    fotografiaEspecie: null,
  });

  const navigate = useNavigate();

  const handleBitacoraChange = (e) => {
    const { name, value } = e.target;
    setBitacoraData2((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEspecieChange = (e) => {
    const { name, value } = e.target;
    setEspecieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !bitacoraData2.titulo ||
      !bitacoraData2.fecha ||
      !bitacoraData2.hora ||
      !bitacoraData2.latitud ||
      !bitacoraData2.longitud ||
      !bitacoraData2.clima ||
      !bitacoraData2.habitat ||
      !bitacoraData2.detallesEspecies ||
      !bitacoraData2.observaciones ||
      !especieData.nombreCientifico ||
      !especieData.nombreComun ||
      !especieData.familia ||
      !especieData.cantidadMuestras
    ) {
      alert('Por favor, complete todos los campos requeridos');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Obtener y verificar los datos del usuario
      const userDataString = localStorage.getItem('userData');
      console.log('Datos del usuario en localStorage:', userDataString);

      const userData = JSON.parse(userDataString);
      console.log('Datos del usuario parseados:', userData);

      if (!userData || !userData.userId) {
        console.error('Error: No se encontró el ID del usuario en localStorage');
        alert('Error: Usuario no identificado.');
        return;
      }

      console.log('ID del usuario encontrado:', userData.userId);
      console.log('Rol del usuario:', userData.rol);

      // Guardar la especie
      const especieRef = await addDoc(collection(db, 'especies'), especieData);
      console.log("Especie guardada con ID:", especieRef.id);

      // Crear el objeto de la bitácora
      const bitacoraDocData = {
        ...bitacoraData2,
        especieId: especieRef.id,
        usuarioId: userData.userId,
        rolUsuario: userData.rol,
        fechaCreacion: new Date().toISOString()
      };

      console.log('Datos de la bitácora a guardar:', bitacoraDocData);

      // Guardar la bitácora
      const bitacoraRef = await addDoc(collection(db, 'bitacoras'), bitacoraDocData);
      console.log("Bitácora guardada con ID:", bitacoraRef.id);
      console.log("ID del usuario guardado en la bitácora:", bitacoraDocData.usuarioId);

      // Verificar que la bitácora se guardó correctamente
      if (bitacoraRef.id) {
        alert('Bitácora registrada exitosamente');
        navigate('/panelusuario');
      } else {
        throw new Error('No se pudo obtener el ID de la bitácora');
      }
    } catch (error) {
      console.error('Error detallado al guardar:', error);
      alert('Error al guardar la bitácora. Por favor, intente de nuevo.');
    }
  };

  const handleBack = () => navigate('/panelusuario');

  return {
    bitacoraData2,
    especieData,
    handleBitacoraChange,
    handleEspecieChange,
    handleSubmit,
    handleBack,
  }; 
}