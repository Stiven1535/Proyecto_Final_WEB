// CategoriaDetallesLogica.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const useCategoriaDetallesLogica = (categoryId) => {
  const [category, setCategory] = useState(null);
  const [bitacoras, setBitacoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryAndBitacoras = async () => {
      try {
        setLoading(true);
        // Obtener los detalles de la categoría
        const categoryDoc = await getDoc(doc(db, 'categorias', categoryId));
        
        if (!categoryDoc.exists()) {
          throw new Error('La categoría no existe');
        }
        
        const categoryData = categoryDoc.data();
        setCategory({ id: categoryDoc.id, ...categoryData });

        // Obtener las bitácoras asociadas
        if (categoryData.bitacoras && categoryData.bitacoras.length > 0) {
          const bitacorasPromises = categoryData.bitacoras.map(bitacoraId =>
            getDoc(doc(db, 'bitacoras', bitacoraId))
          );
          
          const bitacorasDocs = await Promise.all(bitacorasPromises);
          const bitacorasData = bitacorasDocs
            .filter(doc => doc.exists())
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            
          setBitacoras(bitacorasData);
        } else {
          setBitacoras([]);
        }
      } catch (err) {
        console.error('Error al cargar los detalles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryAndBitacoras();
    }
  }, [categoryId]);

  const goBack = () => {
    navigate('/administrarcategoria');
  };

  return {
    category,
    bitacoras,
    loading,
    error,
    goBack
  };
};

export default useCategoriaDetallesLogica;