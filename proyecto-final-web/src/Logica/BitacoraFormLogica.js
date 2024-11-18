import { useState } from 'react';
import { db } from './firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correctamente importada
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export function useBitacoraFormLogic() {
  // Estado para los datos de la bitácora
  const [bitacoraData, setBitacoraData] = useState({
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

  // Estado para los datos de la especie
  const [especieData, setEspecieData] = useState({
    nombreCientifico: '',
    nombreComun: '',
    familia: '',
    cantidadMuestras: '',
    estadoPlanta: '',
    fotografiaEspecie: null,
  });

  const navigate = useNavigate();

  // Función para manejar cambios en los inputs de la bitácora
  const handleBitacoraChange = (e) => {
    const { name, value } = e.target;
    setBitacoraData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar cambios en los inputs de la especie
  const handleEspecieChange = (e) => {
    const { name, value } = e.target;
    setEspecieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validación del formulario
  const validateForm = () => {
    if (
      !bitacoraData.titulo ||
      !bitacoraData.fecha ||
      !bitacoraData.hora ||
      !bitacoraData.latitud ||
      !bitacoraData.longitud ||
      !bitacoraData.clima ||
      !bitacoraData.habitat ||
      !bitacoraData.detallesEspecies ||
      !bitacoraData.observaciones ||
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

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Guardar la especie en la colección "especies"
      const especieRef = await addDoc(collection(db, 'especies'), especieData);
      console.log("Especie guardada con ID:", especieRef.id);

      // Asociar la especie a la bitácora (solo incluimos el ID de la especie)
      const bitacoraDocData = {
        ...bitacoraData,
        especieId: especieRef.id, // Guardamos el ID de la especie
      };

      // Guardar la bitácora en la colección "bitacoras"
      await addDoc(collection(db, 'bitacoras'), bitacoraDocData);
      alert('Bitácora registrada exitosamente');
      navigate('/panelusuario');
    } catch (error) {
      console.error('Error al guardar la bitácora o la especie:', error);
    }
  };

  // Función para manejar el regreso a la página anterior
  const handleBack = () => navigate('/panelusuario');

  return {
    bitacoraData,
    especieData,
    handleBitacoraChange,
    handleEspecieChange,
    handleSubmit,
    handleBack,
  };
}
