import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  runTransaction,
  deleteDoc,
  setDoc,
  addDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const useEditarCategoriaLogica = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const [ecosystemType, setEcosystemType] = useState('');
  const [season, setSeason] = useState('');
  const [categoryBitacoras, setCategoryBitacoras] = useState([]);
  const [selectedBitacoraId, setSelectedBitacoraId] = useState('');
  const [loading, setLoading] = useState(true);
  const [originalCategory, setOriginalCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryAndBitacoras = async () => {
      try {
        const categoryDoc = await getDoc(doc(db, 'categorias', categoryId));
        if (categoryDoc.exists()) {
          const categoryData = categoryDoc.data();
          setEcosystemType(categoryData.ecosystemType);
          setSeason(categoryData.season);
          setOriginalCategory({
            id: categoryId,
            ...categoryData
          });

          const bitacorasSnapshot = await getDocs(collection(db, 'bitacoras'));
          const allBitacoras = bitacorasSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          const associatedBitacoras = allBitacoras.filter(bitacora =>
            categoryData.bitacoras.includes(bitacora.id)
          );
          
          setCategoryBitacoras(associatedBitacoras);
          
          if (associatedBitacoras.length === 1) {
            setSelectedBitacoraId(associatedBitacoras[0].id);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchCategoryAndBitacoras();
  }, [categoryId]);

  const saveChanges = async () => {
    try {
      if (!selectedBitacoraId && categoryBitacoras.length > 1) {
        alert('Por favor seleccione una bitácora para editar');
        return;
      }

      const bitacoraToUpdate = selectedBitacoraId || 
        (categoryBitacoras.length === 1 ? categoryBitacoras[0].id : null);

      const categoriesSnapshot = await getDocs(collection(db, 'categorias'));
      const existingCategory = categoriesSnapshot.docs.find(doc => {
        const data = doc.data();
        return data.ecosystemType === ecosystemType && 
               data.season === season && 
               doc.id !== categoryId;
      });

      await runTransaction(db, async (transaction) => {
        if (existingCategory) {
          // Si existe una categoría con los nuevos valores, mover la bitácora
          const existingCategoryRef = doc(db, 'categorias', existingCategory.id);
          const existingCategoryDoc = await transaction.get(existingCategoryRef);
          const existingCategoryData = existingCategoryDoc.data();

          // Actualizar la categoría existente
          transaction.update(existingCategoryRef, {
            bitacoras: [...existingCategoryData.bitacoras, bitacoraToUpdate],
            quantityBitacoras: existingCategoryData.quantityBitacoras + 1
          });

          // Actualizar la categoría original
          const originalCategoryRef = doc(db, 'categorias', categoryId);
          const updatedBitacoras = originalCategory.bitacoras.filter(
            id => id !== bitacoraToUpdate
          );
          
          if (updatedBitacoras.length === 0) {
            // Si no quedan bitácoras, eliminar la categoría
            transaction.delete(originalCategoryRef);
          } else {
            // Si quedan bitácoras, actualizar la cantidad
            transaction.update(originalCategoryRef, {
              bitacoras: updatedBitacoras,
              quantityBitacoras: originalCategory.quantityBitacoras - 1
            });
          }

          // Actualizar la referencia de categoría en la bitácora
          const bitacoraRef = doc(db, 'bitacoras', bitacoraToUpdate);
          transaction.update(bitacoraRef, {
            categoryId: existingCategory.id
          });
        } else {
          // Si NO existe la categoría, crear una nueva
          const newCategoryRef = doc(collection(db, 'categorias'));
          
          // Crear la nueva categoría
          transaction.set(newCategoryRef, {
            ecosystemType,
            season,
            bitacoras: [bitacoraToUpdate],
            quantityBitacoras: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });

          // Actualizar la categoría original
          const originalCategoryRef = doc(db, 'categorias', categoryId);
          const updatedBitacoras = originalCategory.bitacoras.filter(
            id => id !== bitacoraToUpdate
          );
          
          if (updatedBitacoras.length === 0) {
            // Si no quedan bitácoras, eliminar la categoría original
            transaction.delete(originalCategoryRef);
          } else {
            // Si quedan bitácoras, actualizar la cantidad
            transaction.update(originalCategoryRef, {
              bitacoras: updatedBitacoras,
              quantityBitacoras: originalCategory.quantityBitacoras - 1
            });
          }

          // Actualizar la referencia de categoría en la bitácora
          const bitacoraRef = doc(db, 'bitacoras', bitacoraToUpdate);
          transaction.update(bitacoraRef, {
            categoryId: newCategoryRef.id
          });
        }
      });

      navigate('/administrarcategoria');
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      alert('Error al actualizar la categoría');
    }
  };

  const goBack = () => {
    navigate('/administrarcategoria');
  };

  return {
    ecosystemType,
    setEcosystemType,
    season,
    setSeason,
    categoryBitacoras,
    selectedBitacoraId,
    setSelectedBitacoraId,
    saveChanges,
    goBack,
    loading
  };
};

export default useEditarCategoriaLogica;