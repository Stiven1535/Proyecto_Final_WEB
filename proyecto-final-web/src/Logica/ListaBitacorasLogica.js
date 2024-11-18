import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';

const useBitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [filteredBitacoras, setFilteredBitacoras] = useState([]);
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    ubicacion: '',
    clima: '',
    habitat: ''
  });

  // Obtener las bitácoras de Firebase
  useEffect(() => {
    const fetchBitacoras = async () => {
      const querySnapshot = await getDocs(collection(db, 'bitacoras'));
      const bitacorasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBitacoras(bitacorasList);
      setFilteredBitacoras(bitacorasList);
    };

    fetchBitacoras();
  }, []);

  // Filtrar bitácoras según los filtros seleccionados
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
  

  // Manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Eliminar una bitácora y su especie asociada
  const handleDelete = async (id) => {
    try {
      const bitacoraDoc = await getDoc(doc(db, 'bitacoras', id));
      const bitacoraData = bitacoraDoc.data();

      if (bitacoraData.especieId) {
        const especieId = bitacoraData.especieId;
        const especieDoc = doc(db, 'especies', especieId);
        await deleteDoc(especieDoc);
      }

      await deleteDoc(doc(db, 'bitacoras', id));

      setBitacoras((prevBitacoras) => prevBitacoras.filter((bitacora) => bitacora.id !== id));
      setFilteredBitacoras((prevFiltered) => prevFiltered.filter((bitacora) => bitacora.id !== id));

      alert('Bitácora y especie eliminadas exitosamente');
    } catch (e) {
      console.error('Error al eliminar la bitácora o la especie: ', e);
      alert('Error al eliminar la bitácora o la especie');
    }
  };

  return {
    bitacoras,
    filteredBitacoras,
    filters,
    setFilters,
    handleFilterChange,
    handleDelete
  };
};

export default useBitacoras;
