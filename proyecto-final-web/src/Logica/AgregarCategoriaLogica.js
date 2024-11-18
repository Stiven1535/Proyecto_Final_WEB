import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const useAgregarCategoriaLogica = (onSave) => {
  const [ecosystemType, setEcosystemType] = useState('');
  const [season, setSeason] = useState('');
  const [bitacoraTitle, setBitacoraTitle] = useState('');
  const [bitacoraId, setBitacoraId] = useState('');
  const [bitacoras, setBitacoras] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]); // Para almacenar las categorías existentes
  const navigate = useNavigate();

  // Cargar bitácoras existentes y categorías para evitar duplicados
  useEffect(() => {
    const fetchBitacorasAndCategories = async () => {
      try {
        // Obtener todas las bitácoras
        const bitacorasSnapshot = await getDocs(collection(db, 'bitacoras'));
        const bitacorasData = bitacorasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBitacoras(bitacorasData);

        // Obtener todas las categorías existentes
        const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
        const categoriasData = categoriasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExistingCategories(categoriasData);
      } catch (error) {
        console.error('Error al cargar bitácoras o categorías:', error);
      }
    };

    fetchBitacorasAndCategories();
  }, []);

  const saveCategory = async () => {
    try {
      // Buscar si ya existe una categoría con el mismo ecosystemType y season
      const existingCategory = existingCategories.find(
        (category) => category.ecosystemType === ecosystemType && category.season === season
      );

      // Si la categoría existe, se actualiza incrementando la cantidad de bitácoras
      if (existingCategory) {
        // Actualizar la categoría existente
        const updatedCategory = {
          ...existingCategory,
          bitacoras: [...existingCategory.bitacoras, bitacoraId], // Añadir la nueva bitácora
        };

        // Actualizar la categoría en Firestore
        const categoryDocRef = doc(db, 'categorias', existingCategory.id);
        await updateDoc(categoryDocRef, updatedCategory);

        if (onSave) {
          onSave({ ...updatedCategory, id: existingCategory.id });
        }
      } else {
        // Si no existe, crear una nueva categoría
        const selectedBitacora = bitacoras.find((b) => b.id === bitacoraId);

        const newCategory = {
          ecosystemType,
          season,
          bitacoraTitle: selectedBitacora.titulo,
          bitacoraId,
          createdAt: new Date().toISOString(),
          bitacoras: [bitacoraId], // Array inicial con la primera bitácora
        };

        // Guardar la nueva categoría en Firestore
        const docRef = await addDoc(collection(db, 'categorias'), newCategory);

        if (onSave) {
          onSave({ ...newCategory, id: docRef.id });
        }
      }

      navigate('/administrarcategoria');
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      alert('Error al guardar la categoría');
    }
  };

  const goBack = () => {
    navigate('/administrarcategoria');
  };

  // Filtrar las bitácoras ya asignadas a categorías
  const availableBitacoras = bitacoras.filter(
    (bitacora) => !existingCategories.some((category) => category.bitacoras.includes(bitacora.id))
  );

  return {
    ecosystemType,
    setEcosystemType,
    season,
    setSeason,
    bitacoraTitle,
    setBitacoraTitle,
    bitacoraId,
    setBitacoraId,
    bitacoras: availableBitacoras, // Lista de bitácoras disponibles para el selector
    saveCategory,
    goBack,
  };
};

export default useAgregarCategoriaLogica;
