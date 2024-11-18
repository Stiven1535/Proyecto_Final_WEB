import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Función para obtener un usuario por su ID
const getUserById = async (userId) => {
  try {
    const userDoc = doc(db, 'usuarios', userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = { 
        id: userSnapshot.id, 
        ...userSnapshot.data(),
      };
      console.log("Datos del usuario:", userData);
      return userData;
    } else {
      console.log("No se encontró el usuario");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

// Función para obtener todos los usuarios
const getUsers = async () => {
  try {
    const usersCollection = collection(db, 'usuarios');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((userDoc) => {
      const { nombreCompleto, email, genero, password, rol } = userDoc.data();
      return { 
        id: userDoc.id, 
        nombreCompleto, 
        email, 
        genero, 
        password,
        rol, // Campo 'rol' directamente del documento del usuario
      };
    });
    return usersList;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};

// Función para actualizar los datos del usuario
const updateUser = async (userId, userData) => {
  try {
    const userDoc = doc(db, 'usuarios', userId);
    await updateDoc(userDoc, userData);
    console.log("Usuario actualizado con éxito:", userData);
    return true;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return false;
  }
};

// Función modificada para eliminar usuario de Firestore (sin autenticación)
const deleteUser = async (userId) => {
  try {
    // 1. Obtener datos del usuario de Firestore
    const userDoc = doc(db, 'usuarios', userId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      throw new Error('Usuario no encontrado');
    }

    // 2. Eliminar el documento del usuario de Firestore
    await deleteDoc(userDoc);
    console.log("Usuario eliminado completamente de Firestore");
    
    return true;
  } catch (error) {
    console.error("Error durante el proceso de eliminación:", error);
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

// Función para navegar a la página de registro
const navigateToRegistrar = (navigate) => {
  navigate('/registrarusuario');
  console.log("Redirigiendo a la página de registro de usuario");
};

// Función para navegar a la página de edición
const navigateToEditar = (navigate, userId) => {
  navigate(`/editarusuario/${userId}`);
  console.log("Redirigiendo a la página de edición de usuario con ID:", userId);
};

export { 
  getUsers, 
  deleteUser, 
  navigateToRegistrar, 
  navigateToEditar, 
  getUserById, 
  updateUser,
};
