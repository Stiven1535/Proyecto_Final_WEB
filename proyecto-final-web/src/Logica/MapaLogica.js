import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Logica/firebaseConfig';

// Hook personalizado para gestionar el mapa y la lógica
export const useMapViewLogic = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Coordenadas iniciales
  const [zoom, setZoom] = useState(13); // Zoom inicial
  const [bitacoras, setBitacoras] = useState([]); // Títulos de bitácoras
  const [selectedTitle, setSelectedTitle] = useState(''); // Título seleccionado

  // Carga los títulos de las bitácoras desde Firestore
  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bitacoras'));
        const bitacorasList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          titulo: doc.data().titulo,
          latitud: doc.data().latitud,
          longitud: doc.data().longitud
        }));
        setBitacoras(bitacorasList);
      } catch (error) {
        console.error('Error al obtener las bitácoras:', error);
      }
    };

    fetchBitacoras();
  }, []);

  // Actualiza las coordenadas y el zoom según la bitácora seleccionada
  const handleSearch = () => {
    const selectedBitacora = bitacoras.find(b => b.titulo === selectedTitle);
    if (selectedBitacora) {
      setCoordinates([selectedBitacora.latitud, selectedBitacora.longitud]);
      setLatitude(selectedBitacora.latitud);
      setLongitude(selectedBitacora.longitud);
      setZoom(15); // Zoom cercano
    }
  };

  return {
    latitude,
    longitude,
    coordinates,
    zoom,
    bitacoras,
    selectedTitle,
    setSelectedTitle,
    handleSearch
  };
};
