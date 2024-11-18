import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const useAdministrarCategoriasLogica = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Cargar categorías
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categorias'));
      const categoriesData = await Promise.all(snapshot.docs.map(async doc => {
        const categoryData = doc.data();
        
        // Contar bitácoras asociadas
        const quantityBitacoras = categoryData.bitacoras ? categoryData.bitacoras.length : 0;
        
        return {
          id: doc.id,
          ...categoryData,
          quantityBitacoras
        };
      }));
      
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const addCategory = () => {
    navigate('/agregarcategoria');
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        await deleteDoc(doc(db, 'categorias', categoryId));
        await fetchCategories(); // Recargar categorías
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  const viewDetails = (categoryId) => {
    navigate(`/categoria/${categoryId}`);
  };

  const editCategory = (categoryId) => {
    navigate(`/editarcategoria/${categoryId}`); // Redirigir a la página de edición
  };

  const goBackToAdminPanel = () => {
    navigate('/paneladministrador');
  };

  return {
    categories,
    addCategory,
    deleteCategory,
    viewDetails,
    editCategory, // Devolver la función
    goBackToAdminPanel,
  };
};

export default useAdministrarCategoriasLogica;
