import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const useBitacoras2 = () => {
  const [bitacoras, setBitacoras2] = useState([]);
  const [filteredBitacoras, setFilteredBitacoras] = useState([]);
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    ubicacion: '',
    clima: '',
    habitat: '',
    search: ''
  });

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

  useEffect(() => {
    const fetchBitacoras = async () => {
      const querySnapshot = await getDocs(collection(db, 'bitacoras'));
      const bitacorasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBitacoras2(bitacorasList);
      setFilteredBitacoras(bitacorasList);
    };

    fetchBitacoras();
  }, []);

  useEffect(() => {
    let filtered = bitacoras;
  
    // Filtrar por fecha
    if (filters.fechaInicio) {
      filtered = filtered.filter(bitacora => new Date(bitacora.fecha) >= new Date(filters.fechaInicio));
    }
  
    if (filters.fechaFin) {
      filtered = filtered.filter(bitacora => new Date(bitacora.fecha) <= new Date(filters.fechaFin));
    }
  
    // Filtrar por ubicación (latitud y longitud concatenados)
    if (filters.ubicacion) {
      filtered = filtered.filter(bitacora => {
        const ubicacionConcatenada = `${bitacora.latitud},${bitacora.longitud}`;
        return ubicacionConcatenada.includes(filters.ubicacion);
      });
    }
  
    // Filtrar por clima
    if (filters.clima) {
      filtered = filtered.filter(bitacora => bitacora.clima.toLowerCase().includes(filters.clima.toLowerCase()));
    }
  
    // Filtrar por hábitat
    if (filters.habitat) {
      filtered = filtered.filter(bitacora => bitacora.habitat.toLowerCase().includes(filters.habitat.toLowerCase()));
    }
  
    // Filtrar por búsqueda
    if (filters.search) {
      filtered = filtered.filter(bitacora => 
        bitacora.titulo.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
  
    setFilteredBitacoras(filtered);
  }, [filters, bitacoras]);

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
        rolUsuario: userData.rol
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const bitacoraDoc = await getDoc(doc(db, 'bitacoras', id));
      const bitacoraData2 = bitacoraDoc.data();

      if (bitacoraData2.especieId) {
        const especieId = bitacoraData2.especieId;
        const especieDoc = doc(db, 'especies', especieId);
        await deleteDoc(especieDoc);
      }

      await deleteDoc(doc(db, 'bitacoras', id));

      setBitacoras2((prevBitacoras) => prevBitacoras.filter((bitacora) => bitacora.id !== id));
      setFilteredBitacoras((prevFiltered) => prevFiltered.filter((bitacora) => bitacora.id !== id));

      alert('Bitácora y especie eliminadas exitosamente');
    } catch (e) {
      console.error('Error al eliminar la bitácora o la especie: ', e);
      alert('Error al eliminar la bitácora o la especie');
    }
  };

  return {
    bitacoraData2,
    especieData,
    bitacoras,
    filteredBitacoras,
    filters,
    setFilters,
    handleBitacoraChange,
    handleEspecieChange,
    handleSubmit,
    handleBack,
    handleFilterChange,
    handleDelete
  };
};

export default useBitacoras2;
