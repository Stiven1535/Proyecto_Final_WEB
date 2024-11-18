import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getUsers = async () => {
  try {
    const usersCollection = collection(db, 'usuarios');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => {
      const { nombreCompleto, email, rol } = doc.data();
      return { id: doc.id, nombreCompleto, email, rol };
    });
    return usersList;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Nueva función para eliminar usuario
const deleteUser = async (userId) => {
  try {
    const userDoc = doc(db, 'usuarios', userId);
    await deleteDoc(userDoc);
    console.log("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

export { getUsers, deleteUser };
