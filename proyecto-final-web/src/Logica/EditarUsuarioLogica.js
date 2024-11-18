import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Configuración de Firebase

// Función para obtener los datos del usuario, incluyendo su rol
const getUserById = async (userId) => {
  try {
    // Obtenemos los datos del usuario desde la colección 'usuarios'
    const userDoc = doc(db, 'usuarios', userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      // Retorna los datos del usuario junto con el rol directamente
      return {
        id: userSnapshot.id,
        nombreCompleto: userData.nombreCompleto,
        genero: userData.genero,
        email: userData.email,
        password: userData.password,
        rol: userData.rol, // Campo 'rol' directamente desde el documento del usuario
      };
    } else {
      console.log('Usuario no encontrado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    return null;
  }
};

// Exporta la función para su uso en otros módulos
export { getUserById };
