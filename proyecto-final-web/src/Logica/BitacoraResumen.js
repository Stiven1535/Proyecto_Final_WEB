// Importaciones necesarias
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export function useBitacoraResumenLogic() {
  const { id } = useParams(); // Obtener el ID de la bitácora desde la URL
  const [bitacora, setBitacora] = useState(null);
  const [especie, setEspecie] = useState(null); // Estado para almacenar los datos de la especie

  useEffect(() => {
    const fetchBitacora = async () => {
      try {
        // Obtener los datos de la bitácora
        const docRef = doc(db, 'bitacoras', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const bitacoraData = docSnap.data();
          setBitacora(bitacoraData); // Guardar los datos de la bitácora

          // Obtener los datos de la especie asociada usando el ID de la especie
          if (bitacoraData.especieId) {
            const especieRef = doc(db, 'especies', bitacoraData.especieId);
            const especieSnap = await getDoc(especieRef);
            if (especieSnap.exists()) {
              setEspecie(especieSnap.data()); // Guardar los datos de la especie
            } else {
              console.log('No se encontró la especie');
            }
          }
        } else {
          console.log('No existe el documento de la bitácora');
        }
      } catch (error) {
        console.error('Error al obtener la bitácora:', error);
      }
    };

    fetchBitacora();
  }, [id]);

  return { bitacora, especie };
}
